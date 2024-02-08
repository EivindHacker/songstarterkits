import DBManager from "./storageManager.mjs";

class User {
	constructor() {
		this.id;
		this.email;
		this.name;
		this.pswHash;
		this.credits;
		this.purchasedKits;
		this.uploadedKits;
		this.creator;
	}

	save() {
		DBManager.save(this);
	}
}

export default User;
