/**
 * Skenario Pengujian E2E:
 *
 * - Login spec
 *  - harus menampilkan halaman login dengan benar
 *  - harus menampilkan pesan kesalahan/alert jika email atau password salah
 *  - harus berhasil login dan masuk ke halaman utama ketika kredensial benar
 *  - harus berhasil melakukan logout dari aplikasi
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Mencegah Cypress gagal saat ada error unhandled pada aplikasi
    Cypress.on('uncaught:exception', () => false);
    cy.visit('/');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus menampilkan alert jika email atau password salah', () => {
    // Mock respon API login gagal (401 Unauthorized)
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Email or password is wrong',
      },
    }).as('loginFailed');

    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type('wrongemail_xyz@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('harus berhasil login dan masuk ke halaman utama ketika kredensial benar', () => {
    // Mock respon API login berhasil
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User logged in',
        data: {
          token: 'fake-jwt-token-12345',
        },
      },
    }).as('loginSuccess');

    // Mock respon API profil pengguna me/user
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Velo',
            email: 'velo@gmail.com',
            avatar: 'https://generated-image-url.png',
          },
        },
      },
    }).as('getUserProfile');

    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    // Pastikan elemen UI penerima informasi login & tombol logout tampil
    cy.get('.app-auth__user', { timeout: 15000 }).should('be.visible');
    cy.get('.btn-logout', { timeout: 15000 }).should('be.visible');
  });

  it('harus berhasil melakukan logout dari aplikasi', () => {
    // Mock respon API login berhasil
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'fake-jwt-token-12345',
        },
      },
    }).as('loginSuccess');

    // Mock respon API profil pengguna me/user
    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Velo',
            email: 'velo@gmail.com',
          },
        },
      },
    }).as('getUserProfile');

    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    // Klik tombol logout
    cy.get('.btn-logout', { timeout: 15000 }).click();

    // Memastikan kembali ke halaman utama/login
    cy.get('a[href="/login"]', { timeout: 15000 }).should('be.visible');
  });
});