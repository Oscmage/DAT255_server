#!/bin/bash

nohub githubhook --secret=$SECRET_TOKEN push sh/git_pull.sh &>logs/hook.log &