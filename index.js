
const { u, wallet } = require('@cityofzion/neon-core');

function signMessageWithoutSalt(message, wif) {
  const privateKey = wallet.getPrivateKeyFromWIF(wif);
  const publicKey = wallet.getPublicKeyFromPrivateKey(privateKey);
  const parameterHexString = Buffer.from(message).toString('hex');
  const lengthHex = u.num2VarInt(parameterHexString.length / 2);
  const concatenatedString = lengthHex + parameterHexString;
  const serializedTransaction = '010001f0' + concatenatedString + '0000';
  const result = {
    signature: wallet.sign(serializedTransaction, privateKey),
    publicKey,
  };
  return result;
}

function verifySignatureWithoutSalt(message, signature, publicKey) {
  const parameterHexString = Buffer.from(message).toString('hex');
  const lengthHex = u.num2VarInt(parameterHexString.length / 2);
  const concatenatedString = lengthHex + parameterHexString;
  const serializedTransaction = '010001f0' + concatenatedString + '0000';
  return wallet.verify(serializedTransaction, signature, publicKey)
}

(async function () {
  const message = 'Hello world';
  const wif = 'KyHyZH3neBJuGPJLByw5osr3XsqFPNTWHhDxRQCpYb3QW3jswe79';
  const { signature, publicKey } = signMessageWithoutSalt(message, wif);
  console.log(signature)
  console.log(publicKey)
  const result = verifySignatureWithoutSalt(message, signature, publicKey);
  console.log(result);
})();