sudo docker build --network=host -t memos-v0.22.2-user .
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
$GOPATH/bin/air -c scripts/.air.toml