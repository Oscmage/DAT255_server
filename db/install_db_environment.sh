#!/bin/bash

killall postgres
rm -r data
mkdir data
export PGUSER='dbadmin'
initdb -D data --username=dbadmin --pwfile=pw
pg_ctl -D data -l data/logfile start
