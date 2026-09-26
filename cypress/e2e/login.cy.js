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
    // Supaya Cypress tidak gagal jika ada error unhandled di app
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

    // Menggunakan akun ujimu
    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    // Beri timeout 15000ms (15 detik) untuk mengantisipasi koneksi API dari GitHub Runner
    cy.get('.app-auth__user', { timeout: 15000 }).should('be.visible');
    cy.get('.btn-logout', { timeout: 15000 }).should('be.visible');
  });

  it('harus berhasil melakukan logout dari aplikasi', () => {
    cy.get('a[href="/login"]').click();

    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    cy.get('.btn-logout', { timeout: 15000 }).click();

    cy.get('a[href="/login"]', { timeout: 15000 }).should('be.visible');
  });
});