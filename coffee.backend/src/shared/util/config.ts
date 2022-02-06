export class Config {
  static IsDebug = () => process?.env.IS_DEBUG || true;
  static Port = () => Number(process?.env?.PORT) || 3000;
  static APIVersion = () => process?.env.API_VERSION || '/v1';
  static JWTSecret = () => process?.env.JWT_SECRET || 'EwT7yU85FYm2ptkMqNQt';
  static JWTExpiration = () => process?.env.JWT_EXPIRATION || '2h';
  static JWTPrivateKeyPath = () =>
    process?.env.JWT_PRIVATE_KEY_PATH || './jwt/private.key';
  static JWTPublicKeyPath = () =>
    process?.env.JWT_PUBLIC_KEY_PATH || './jwt/public.key';
  static DBPath = () => process?.env?.DB_PATH || './coffee.sqlite';
}
