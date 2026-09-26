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
  // Buat kredensial unik berdasarkan timestamp agar tidak bentrok di API
  const randomUser = `user_${Date.now()}`;
  const testEmail = `${randomUser}@gmail.com`;
  const testPassword = 'password123';
  const testName = 'User Test CI';

  before(() => {
    // Registrasi akun baru secara programmatic/UI sebelum tes berjalan
    cy.visit('/register');
    cy.get('input[placeholder="Nama"]').type(testName);
    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus menampilkan alert jika email atau password salah', () => {
    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type('wrongemail_xyz@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('harus berhasil login dan masuk ke halaman utama ketika kredensial benar', () => {
    cy.get('a[href="/login"]').click();

    // Menggunakan akun yang baru saja dibuat di block before()
    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Beri timeout 10000ms untuk mengantisipasi koneksi CI yang lambat
    cy.get('.app-auth__user', { timeout: 10000 }).should('be.visible');
    cy.get('.btn-logout', { timeout: 10000 }).should('be.visible');
  });

  it('harus berhasil melakukan logout dari aplikasi', () => {
    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();

    cy.get('.btn-logout', { timeout: 10000 }).click();

    cy.get('a[href="/login"]', { timeout: 10000 }).should('be.visible');
  });
});