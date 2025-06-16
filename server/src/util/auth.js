// Lucia Auth adapted for mongoose on javascript

import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import Session from "../models/session.js";
import Account from "../models/account.js";

export function generateSessionToken() {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token, userId) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = new Session({
		id: sessionId,
		account: userId
	});
	await session.save();
	return session;
}

export async function validateSessionToken(token) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = await Session.findOne({ id: sessionId });
	if (session === null) {
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime()) {
		await Session.deleteOne({ id: sessionId });
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await session.save();
	}
	const user = await Account.findOne({ _id: session.account });
	return { session, user };
}

export async function invalidateSession(sessionId) {
	await Session.deleteOne({ id: sessionId });
}

export async function invalidateAllSessions(userId) {
	await Session.deleteMany({ account: userId });
};

export async function getSessionToken(userId) {
	const token = generateSessionToken();
	const session = await createSession(token, userId);
	return [session, token];
}

export async function validateToken(token) {
	if (token != null) {
		return await validateSessionToken(token);
	}
	return { session: null, user: null };
}