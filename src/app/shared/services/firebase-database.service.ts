import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, DocumentSnapshot } from '@angular/fire/firestore';
import { map, catchError } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  private INVITAION_COLLECTION_NAME: string = 'invitations';
  private EXHIBITION_DETAILS_COLLECTION_NAME: string = 'exhibition_details';
  private LOCATIONS_COLLECTION_NAME: string = 'locations';

  private invitationsCollection: AngularFirestoreCollection<{}>;
  private exhibitionDetailsCollection: AngularFirestoreCollection<{}>;
  private locationsCollection: AngularFirestoreCollection<{}>;

  constructor(private db: AngularFirestore) {
    this.invitationsCollection = db.collection<{}>(this.INVITAION_COLLECTION_NAME);
    this.exhibitionDetailsCollection = db.collection<{}>(this.EXHIBITION_DETAILS_COLLECTION_NAME);
    this.locationsCollection = db.collection<{}>(this.LOCATIONS_COLLECTION_NAME);
  }

  getNumberOfInvitations(): Observable<number> {
    return this.invitationsCollection.get()
      .pipe(
        //TODO: if error return big negative value
        catchError((error: HttpErrorResponse, caught) => {
          console.log(`Error: ${JSON.stringify(error)}`);
          return caught;
        }),
        map<QuerySnapshot<{}>, number>(invitations =>  {
          if(invitations.empty) {
            // there is at least one invitation so if empty it means that there is not internet connection or sth else
            // then we return big value
            return 10000;
          } else {
            return invitations.size;
          }
        })
      );
  }

  insertInvitation(invitationId: string): Observable<string> {
    const invitation = {
      id: invitationId
    }
    return from(
      this.invitationsCollection.add(invitation)
        .then(invitationSaved => invitationId)
    );
  }

  getExhibitionInformation(id: string): Observable<string> {
    return this.exhibitionDetailsCollection.doc(id).get()
      .pipe(
        map<DocumentSnapshot<{}>, string>(exhibitionInformation => {
          return exhibitionInformation.data()['value'];
        })
      );
  }

  getLocations(): Observable<Array<string>> {
    return this.locationsCollection.get()
      .pipe(
        map<QuerySnapshot<{}>, string[]>(locations => locations.docs.map(doc => doc.id))
      );
  }

  checkIfLocationExists(id: string): Observable<boolean> {
    return this.locationsCollection.doc(id).get()
      .pipe(
        map<DocumentSnapshot<{}>, boolean>(location => {
          if (!location.exists) {
            console.log(`Location with id: ${id} doesn't exists`);
            return false;
          } else {
            return location.data()['id'] == 'location';
          }
        })
      );
  }
}
