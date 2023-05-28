import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email: string = 'asdf2@asdf.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asfsd' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email: string = 'asdf@asdf.com';
    const res = await request(app.getHttpServer()) // we put the result in the res const to be able get access to the cookie
      .post('/auth/signup')
      .send({ email, password: '12345' })
      .expect(201);
    const cookie = res.get('Set-Cookie'); // Set Cookie is the header of the request

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie) // set a header
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
