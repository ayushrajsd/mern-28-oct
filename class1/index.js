// // fs module -> file system module
// /**
//  * ES6 Modules -> import/export
//  */
// const fs = require("fs"); // common js module

// // fs.readFile("file.txt", "utf8", (err, data) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log(data);
// // });

// const content = "Hello, World!";

// // fs.writeFile("example.txt", content, "utf8", (err) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log("File has been written");
// // });

// // // fs.readFileSync("file.txt", "utf8");

// // fs.rename("example.txt", "new-example.txt", (err) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log("File has been renamed");
// // });

// // fs.unlink("new-example.txt", (err) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log("File has been deleted");
// // });

// // fs.stat("file.txt", (err, stats) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// //   console.log("File size", stats.size);
// //   console.log("Is directory", stats.isDirectory());
// // });

// const directoryName = "my-directory";
// fs.mkdir(directoryName, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Directory created");
// });

// // fs.rmdir(directoryName, { recursive: true }, (err) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }
// // });

// const directoryPath = "./dir";

// if (fs.existsSync(directoryPath)) {
//   console.log("Directory exists");
// } else {
//   console.log("Directory does not exist");
// }

// // fs.access(directory

// path module -> path manipulation
/**
 * file path differs in windows and linux
 * windows uses \ and linux, macos uses /
 */

const path = require("path");

const fullPath = path.join("folder", "subFolder", "file.txt");
// console.log(fullPath);

/**
 *
 * path separator for windows is \ . eg: C:\Users\user\file.txt
 * path separator for linux, macos is / . eg: /home/user/file.txt
 */

const absolutePath = path.resolve("folder", "subFolder", "file.txt");
// console.log(absolutePath);

const fileName = path.basename("./dir/file.txt");
const extName = path.extname("./dir/file.txt");
// console.log(extName);

const pathInfo = path.parse("/path/to/file.txt");
// console.log(pathInfo);

const normalizedPath = path.normalize("/path/to/../file.txt");
console.log(normalizedPath);

const complexPath = "/path/./to/../to/../../file.txt";
console.log(path.normalize(complexPath));
