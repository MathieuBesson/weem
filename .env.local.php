<?php

// This file was generated by running "composer dump-env dev"

return array(
  'APP_ENV' => 'dev',
  'APP_SECRET' => 'a0bd3b84560e351b58f7d98772860352',
  'DATABASE_URL' => 'mysql://weem:weem@127.0.0.1:3306/weem_dev?serverVersion=mariadb-10.4.11',
  'CORS_ALLOW_ORIGIN' => '^https?://(localhost|127\\.0\\.0\\.1)(:[0-9]+)?$',
  'JWT_SECRET_KEY' => '%kernel.project_dir%/config/jwt/private.pem',
  'JWT_PUBLIC_KEY' => '%kernel.project_dir%/config/jwt/public.pem',
  'JWT_PASSPHRASE' => '832f972f628ed90c179aca761d1bbe74'
);
