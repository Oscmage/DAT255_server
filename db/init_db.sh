#!/bin/bash
set -eu
createdb -U dbadmin data/commutity
psql -U dbadmin --file=init_db.sql data/commutity

