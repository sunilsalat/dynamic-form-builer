const crypto = require("crypto");

const algorithm = "aes-192-cbc";
const password = "2001MyForever";



// We will first generate the key, as it is dependent on the algorithm.
// In this case for aes192, the key is 24 bytes (192 bits).
crypto.scrypt(password, "salt", 24, (err, key) => {
  if (err) throw err;

  crypto.randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    console.log(iv);

    // Create Cipher with key and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = "";
    cipher.setEncoding("hex");

    cipher.on("data", (chunk) => (encrypted += chunk));
    cipher.on("end", () => console.log(encrypted)); // Prints encrypted data with key

    cipher.write("some clear text data");
    cipher.end();
  });
});

// We will first generate the key, as it is dependent on the algorithm.
// In this case for aes192, the key is 24 bytes (192 bits).
const key = crypto.scryptSync(password, "salt", 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

// Create decipher with key and iv
const decipher = crypto.createDecipheriv(algorithm, key, iv);

let decrypted = "";
decipher.on("readable", () => {
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString("utf8");
  }
});
decipher.on("end", () => {
  console.log(decrypted);
  // Prints: some clear text data
});

// Encrypted with same algorithm, key and iv.
const encrypted = "e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa";
decipher.write(encrypted, "hex");
decipher.end();
