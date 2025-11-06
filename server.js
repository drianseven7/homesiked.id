import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // folder berisi index.html

// Dummy login (nanti bisa pakai database)
const USER = { email: "user@gmail.com", password: "12345" };

// === LOGIN ===
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    res.json({ message: "Login berhasil!" });
  } else {
    res.status(401).json({ message: "Email atau password salah!" });
  }
});

// === BELI PRODUK ===
app.post("/beli", async (req, res) => {
  const { produk } = req.body;

  // Konfigurasi transporter Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "EMAIL_KAMU@gmail.com",
      pass: "PASSWORD_APLIKASI_GMAIL" // Gunakan App Password Gmail, bukan password biasa
    }
  });

  // Kirim email ke pemilik toko
  const mailOptions = {
    from: "EMAIL_KAMU@gmail.com",
    to: "EMAIL_KAMU@gmail.com", // Gmail penerima
    subject: "Pesanan Baru dari Toko Modern",
    text: `Ada pembelian baru: ${produk}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: `Pesanan ${produk} berhasil, notifikasi dikirim ke Gmail!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengirim email." });
  }
});

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));
