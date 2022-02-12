#openssl genrsa -out ./private.pem -aes256 4096
#openssl rsa -pubout -in ./private.pem -out ./public.pem
# generate private key
openssl genrsa -out ./private.pem 2048
# extatract public key from it
openssl rsa -in private.pem -pubout > ./public.pem