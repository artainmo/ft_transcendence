#!/bin/sh

while true; do
#	rep=$(curl --write-out '%{http_code}' --silent --output /dev/null 0.0.0.0:5432)
	curl 0.0.0.0:3001
	res=$?
	echo $res
	if test "$res" = "7"; then
    	echo "backend not running"
	else
		echo "backend is running"
		npm start dev
		break
	fi
	sleep 5
done
