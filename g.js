class Role {
    constructor(name) {
        this._permissions = 0;
        this._name = name;

        // Methods should be added to the prototype in JS, not as instance properties
        this.addPermission = this.addPermission.bind(this);
        this.removePermission = this.removePermission.bind(this);
        this.hasPermission = this.hasPermission.bind(this);
        this.resetPermissions = this.resetPermissions.bind(this);
    }

    get permissions() {
        return this._permissions;
    }

    get name() {
        return this._name;
    }

    addPermission(permission) {
        if (!this.hasPermission(permission)) {
            this._permissions += permission;
        }
    }

    removePermission(permission) {
        if (this.hasPermission(permission)) {
            this._permissions -= permission;
        }
    }

    hasPermission(permission) {
        return (this.permissions & permission) === permission;
    }

    resetPermissions() {
        this._permissions = 0;
    }
}

const Perms = {
    FOLLOW: 1,
    COMMENT: 2,
    WRITE: 4,
    MODERATE: 8,
    ADMIN: 16
};

const role1 = new Role("User");
role1.addPermission(Perms.WRITE);
role1.addPermission(Perms.COMMENT);
role1.removePermission(Perms.FOLLOW);

console.log(role1.hasPermission(Perms.MODERATE));