// Update waktu & tanggal saat halaman dimuat
function updateDateTime() {
  let now = new Date();
  let tanggal = now.toLocaleDateString('id-ID');
  let waktu = now.toLocaleTimeString('id-ID');
  document.getElementById("waktuTanggal").value = `${tanggal} ${waktu}`;
}

// Hitung total denda dan penjara berdasarkan checkbox yang dicentang
function hitungTotal() {
  let totalDenda = 0;
  let totalPenjara = 0;

  document.querySelectorAll('.CEKLIS:checked').forEach(checkbox => {
    totalDenda += parseInt(checkbox.getAttribute('data-denda'));
    totalPenjara += parseInt(checkbox.getAttribute('data-penjara'));
  });

  let totalDendaElem = document.getElementById("totalDenda");
  let totalPenjaraElem = document.getElementById("totalPenjara");
  if (totalDendaElem) totalDendaElem.innerText = totalDenda;
  if (totalPenjaraElem) totalPenjaraElem.innerText = totalPenjara;
}

// Pasang event listener pada setiap checkbox
document.querySelectorAll('.CEKLIS').forEach(checkbox => {
  checkbox.addEventListener('change', hitungTotal);
});

// Fungsi submitForm untuk membuat laporan berdasarkan data yang diinput dan checkbox yang dicentang
function submitForm() {
  let namaPelaku = document.getElementById("namaPelaku").value;
  let nik = document.getElementById("nik").value;
  let waktuTanggal = document.getElementById("waktuTanggal").value;
  let lokasi = document.getElementById("lokasi").value;
  let namaPetugas = document.getElementById("namaPetugas").value;
  let pangkat = document.getElementById("pangkat").value;
  let devisi = document.getElementById("devisi").value;
  let narasi = document.getElementById("narasi").value;
  let pasalTerpilih = [];

  // Ambil checkbox yang dicentang dan simpan pasal (kolom pertama pada baris tabel)
  let ceklis = document.querySelectorAll(".CEKLIS:checked");
  ceklis.forEach(item => {
    let row = item.closest("tr");
    let pasal = row.cells[0].innerText;
    pasalTerpilih.push(pasal);
  });

  // Ambil nilai total denda dan penjara dari tampilan
  let totalDendaElem = document.getElementById("totalDenda");
  let totalPenjaraElem = document.getElementById("totalPenjara");
  let totalDenda = totalDendaElem ? totalDendaElem.innerText : 0;
  let totalPenjara = totalPenjaraElem ? totalPenjaraElem.innerText : 0;

  // Buat laporan dalam format HTML menggunakan elemen <p>
  let hasil = `
    <h5>🥷LAPORAN PENANGKAPAN🥷 </h5>
    <p><strong>Nama Pelaku:</strong> ${namaPelaku}</p>
    <p><strong>NIK:</strong> ${nik}</p>
    <p><strong>Waktu & Tanggal:</strong> ${waktuTanggal}</p>
    <p><strong>Pasal yang Dilanggar:</strong> ${pasalTerpilih.join(", ")}</p>
    <p><strong>Lokasi Penangkapan:</strong> ${lokasi}</p>
    <p><strong>Nama Petugas:</strong> ${namaPetugas}</p>
    <p><strong>Pangkat:</strong> ${pangkat}</p>
    <p><strong>Devisi:</strong> ${devisi}</p>
    <p><strong>Narasi:</strong> ${narasi}</p>
    <p><strong>Total Denda:</strong> ${totalDenda}</p>
    <p><strong>Total Penjara:</strong> ${totalPenjara} bulan</p>
  `;

  document.getElementById("history").innerHTML = hasil;

  // Reset input form dan checkbox setelah submit
  document.getElementById("namaPelaku").value = "";
  document.getElementById("nik").value = "";
  document.getElementById("lokasi").value = "";
  document.getElementById("namaPetugas").value = "";
  document.getElementById("pangkat").value = "";
  document.getElementById("devisi").value = "";
  document.getElementById("narasi").value = "";
  document.querySelectorAll('.CEKLIS').forEach(checkbox => checkbox.checked = false);
  hitungTotal();
}

// Inisialisasi waktu saat halaman dimuat
window.onload = updateDateTime;
