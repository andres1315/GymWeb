import CryptoJS from 'crypto-js';

interface EncryptionResult {
    success: boolean;
    data?: string;
    error?: string;
}

interface DecryptionResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

class EncryptionService {
    private readonly secretKey: string;

    constructor() {
        this.secretKey = import.meta.env.VITE_APP_ENCRYPTION_KEY ?? 'default-key-change-in-production';
    }

    encrypt<T>(data: T): EncryptionResult {
        try {
            const serializedData = JSON.stringify(data);
            const encrypted = CryptoJS.AES.encrypt(serializedData, this.secretKey).toString();

            return {
                success: true,
                data: encrypted
            };
        } catch (error) {
            console.error('Error al encriptar:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al encriptar'
            };
        }
    }

    decrypt<T = any>(encryptedData: string): DecryptionResult<T> {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedString) {
                return {
                    success: false,
                    error: 'No se pudo desencriptar los datos'
                };
            }

            const parsedData: T = JSON.parse(decryptedString);

            return {
                success: true,
                data: parsedData
            };
        } catch (error) {
            console.error('Error al desencriptar:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al desencriptar'
            };
        }
    }

    encryptString(text: string): EncryptionResult {
        try {
            const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();

            return {
                success: true,
                data: encrypted
            };
        } catch (error) {
            console.error('Error al encriptar string:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al encriptar string'
            };
        }
    }

    decryptString(encryptedText: string): DecryptionResult<string> {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                return {
                    success: false,
                    error: 'No se pudo desencriptar el string'
                };
            }

            return {
                success: true,
                data: decrypted
            };
        } catch (error) {
            console.error('Error al desencriptar string:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido al desencriptar string'
            };
        }
    }

    generateHash(data: string): string {
        return CryptoJS.SHA256(data).toString();
    }

    verifyHash(data: string, hash: string): boolean {
        const generatedHash = this.generateHash(data);
        return generatedHash === hash;
    }
}

// export form singleton
export const encryptionService = new EncryptionService();

export type { EncryptionResult, DecryptionResult };
