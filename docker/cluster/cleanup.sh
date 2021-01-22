#!/bin/bash

echo "delete all redis cluster data..."
rm -rf ./data
echo "delete all redis cluster log..."
rm -rf ./log
echo "create data and log files for redis ..."
mkdir ./data ./log
echo "change permission ..."
chmod 755 -R ./data ./data
echo "done clean up for redis ..."