import http from '../../../core/services/http-marathon.service'

export class MarathonApiService {
    getAllHealthChecks() {
        return http.get('/health-checks');
    }

    getHealthCheckById(id) {
        return http.get(`/health-checks/${id}`);
    }

    getAllTreadmills() {
        return http.get('/treadmills');
    }

    getAllCenters() {
        return http.get('/centers');
    }
}
