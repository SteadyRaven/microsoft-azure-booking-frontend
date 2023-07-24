export const Interseptor = {
    requestHandler(request: any) {
        return request;
    },
    errorHandler(error: { response: { status: number; }; }) {
        if (error && error.response.status === 401) {
            localStorage.removeItem('access_token');
            // window.location = '/login';
            return {};
        }
        else {
            return Promise.reject({ ...error });
        }
    },
    successHandler(response: any) {
        if (response && response.status === 401) {
            //unauthorized code. logout and move to login.
            localStorage.removeItem('access_token');
            // window.location = '/login';
            return {};
        }
        else {
            return response;
        }
    }
};
