#!/bin/bash

# brew install postgresql
# pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
# postgres -V
psql postgres -f ~/development/projects/ams_bundle_tool/setup/AMS\ Database\ Setup/setup_user.sql
psql postgres -U dev -f ~/development/projects/ams_bundle_tool/setup/AMS\ Database\ Setup/setup_db.sql
psql ams -U dev -f ~/development/projects/ams_bundle_tool/setup/AMS\ Database\ Setup/data.sql
psql ams -U dev
