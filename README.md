node-idle-socket
================

This example is intended to handle idle client connections using 'net' module. When a new client is connected to server a file is created at the server for this socket. This file will remain as long as the connection is alive. When you have huge traffic on the server, it may hit the max file limit. You can define the maximum concurrent connections, but in that case no new client will be allowed to connect. The alternate method is to drop the connection which are idle. 
