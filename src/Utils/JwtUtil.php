<?php

namespace App\Utils;

class JwtUtil
{
    public static function tokenDecode($token)
    {
        $jwtPayload = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        return $jwtPayload;
    }
}
