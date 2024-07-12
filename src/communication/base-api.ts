class BaseApi {
    baseUrl: String = '';
    publishRoute: String = '';
    assignedRoute: String = '';

    constructor(assignedRoute: String) {
        this.assignedRoute = assignedRoute;
    }

    getPublishUrl(): String {
        return `${this.baseUrl}/${this.publishRoute}/${this.assignedRoute}/`;
    }

    handleError(err: any): void {
        throw err;
    }
}

export default BaseApi;