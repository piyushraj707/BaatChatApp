import CryptoJS from "crypto-js";
import BigInt from "big-integer"
export const prime = BigInt("147905130815542591665856211911061337883422760995977861103752853481533921216289747240672779927721959225458412663212241166377338582212721973141064276373263709237686739971471535287524778374617528815029630562228988096164731039293177946830524219521175528145560702820238329720412319031739170785112285919221264070767");
export const generator = BigInt("2");

/*
async function producePrimeGeneratorPair() {
	//This function can be used to produce a pair of prime and the corresponding generator to be used in Diffie-Hellman key-exchange.
	const { createDiffieHellman } = require('node:crypto');
	const alice = createDiffieHellman(1024);
	const prime = alice.getPrime().toString('hex');
	const BigIntPrime = BigInt('0x' + prime)
	console.log("Prime: ", BigIntPrime);
	console.log("Generator: ", alice.getGenerator().toString('hex'))
}
*/

function getNumericEquivalent(str) {
	// This function converts any string str to its numeric equivalent
	let ans = "";
	for (const i in str) {
		let curr = str.charCodeAt(i).toString();
		while (curr.length !== 3) curr = '0' + curr;
		ans += curr;
	}
	return ans;
}

export function getSecKey(hashedPass) {
	//This function converts hashedPass to its numeric equivalent in BigInt data type.
	return BigInt(getNumericEquivalent(hashedPass));
}

export function getSignedSecKey(secKey) {
	//This function returns primitiveRoot^secKey (mod prime) which is a public information
	return generator.modPow(secKey, prime);
}

export function encryptMsg(AES_KEY, original_msg) {
	const encrypted_msg = CryptoJS.AES.encrypt(original_msg, AES_KEY.toString()).toString();
	return encrypted_msg;
}

export function decryptMsg(AES_KEY, encrypted_msg) {
	const bytes = CryptoJS.AES.decrypt(encrypted_msg, AES_KEY.toString());
	const decryptedMsg = bytes.toString(CryptoJS.enc.Utf8)
	return decryptedMsg;
}

export function getAESKey(friendsSignedKey, mySecKey) {
	// This function produces the AES key needed for encryption and decryption of messages between the two friends.
	const AES_KEY_GENERATED = friendsSignedKey.modPow(mySecKey, prime);
	return AES_KEY_GENERATED;
}