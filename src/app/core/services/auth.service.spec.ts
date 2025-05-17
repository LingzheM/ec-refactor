import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        localStorage.clear();
        httpMock.verify();
    });

    it('should login with mock credentails', (done) => {
        (service as any).useMock = true;
        service.login('test', '123456').subscribe({
            next: (res) => {
                expect(res).toBeTrue();
                expect(localStorage.getItem('access_token')).toBe('mock-jwt-token');
                done();
            }
        });
    });

    it('should error with wrong mock credentails', (done) => {
        (service as any).useMock = true;
        service.login('foo', 'bar').subscribe({
            error: (err) => {
                expect(err).toBeTruthy();
                expect(localStorage.getItem('access_token')).toBeNull();
                done();
            }
        });
    });

    it('should call HTTP in production mode', () => {
        (service as any).useMock = false;
        service.login('u', 'p').subscribe();
        const req = httpMock.expectOne(`${(service as any).api}/login`);
        expect(req.request.method).toBe('POST');
        req.flush({ token: 'real-token' });
        expect(localStorage.getItem('access_token')).toBe('real-token');
    })

});
