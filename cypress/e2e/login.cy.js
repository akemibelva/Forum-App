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
    cy.visit('/');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    // Navigasi ke halaman login jika belum di halaman login
    cy.get('a[href="/login"]').click();

    // Verifikasi elemen form login
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('harus menampilkan alert jika email atau password salah', () => {
    cy.get('a[href="/login"]').click();

    // Mengisi data login yang salah
    cy.get('input[type="email"]').type('wrongemail@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Memastikan window.alert dipanggil dengan pesan kesalahan
    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
    });
  });

  it('harus berhasil login dan masuk ke halaman utama ketika kredensial benar', () => {
    cy.get('a[href="/login"]').click();

    // Mengisi data login yang valid (Ganti dengan akun ujimu yang terdaftar di API Dicoding)
    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    // Memastikan elemen profil pengguna atau tombol logout muncul di header
    cy.get('.app-auth__user').should('be.visible');
    cy.get('.btn-logout').should('be.visible');
  });

  it('harus berhasil melakukan logout dari aplikasi', () => {
    // Melakukan login terlebih dahulu
    cy.get('a[href="/login"]').click();
    cy.get('input[type="email"]').type('velo@gmail.com');
    cy.get('input[type="password"]').type('velo26');
    cy.get('button[type="submit"]').click();

    // Mengklik tombol logout
    cy.get('.btn-logout').click();

    // Memastikan tombol login muncul kembali
    cy.get('a[href="/login"]').should('be.visible');
  });
});