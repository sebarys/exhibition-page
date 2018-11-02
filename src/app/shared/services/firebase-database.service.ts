import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  private invitationsCollection: AngularFirestoreCollection<{}>;

  constructor(private db: AngularFirestore) {
    this.invitationsCollection = db.collection<{}>('invitations');
  }

  getInvitationsNumber(): Observable<number> {
    return this.db.collection('invitations').get()
      .pipe(
        map<QuerySnapshot<{}>, number>(invitations => invitations.size)
      );
  }

  insertInvitation(invitationId: string): Observable<string> {
    // this.db.
    const invitation = {
      id: invitationId
    }
    return from(
      this.invitationsCollection.add(invitation)
        .then(invitationSaved => invitationId)
    );
  }
}
