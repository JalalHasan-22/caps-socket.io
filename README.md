# caps-socket.io

[pull-request](https://github.com/JalalHasan-22/caps-socket.io/pull/1)

In this lab, I have refactored the code from the previous lab which was built using node events built-in module to a socket.io with three different applications, the first one is the caps.js which will act like a hub in this case, the second one is the vendor and the third is the driver.

in the tests file, Ive done some research on how to test socket.io applications, started a fake server with a fake connection and tesrted wether the console log was called or not, mock implementation for sure.

below you can find the UML daigram for this lab:
![UML](./UML%20new.jpg)
