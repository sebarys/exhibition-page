/* SystemJS module definition */

/* Required to provide static json configuration*/
declare module "*.json" {
  const value: any;
  export default value;
}
