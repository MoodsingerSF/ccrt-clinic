// import React from "react";

// const ImagePreviewDialog = () => {
//   return (
//     <Dialog
//       open={openDialog}
//       onClose={() => {
//         setOpenDialog(false);
//       }}
//       PaperProps={{
//         style: {
//           width: "40%",
//           height: "80%",
//         },
//       }}
//     >
//       <DialogTitle>
//         <Typography style={{ color: DEFAULT_COLOR_MINUS_2 }}>
//           Choose blog cover image
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <Grid
//           item
//           xs={12}
//           container
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Box
//             component={Grid}
//             container
//             style={{
//               height: "30vh",
//               width: "100%",
//               backgroundImage: `url(${coverPhotoPreview})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           ></Box>
//           <Box
//             component={Grid}
//             container
//             item
//             onClick={() => {
//               if (inputRef && inputRef.current) {
//                 inputRef.current.click();
//               }
//             }}
//             className={classes.ccrt__blog__editor__image__button}
//             alignItems="center"
//             justifyContent="center"
//           >
//             <AddSharpIcon
//               className={classes.ccrt__blog__editor__image__add_icon}
//             />
//             <Typography
//               className={classes.ccrt__blog__editor__image__add_icon__text}
//             >
//               Choose
//             </Typography>
//             <input
//               ref={inputRef}
//               type="file"
//               name="file"
//               accept="image/*"
//               onChange={onCoverPhotoChange}
//               hidden
//             />
//           </Box>
//         </Grid>
//       </DialogContent>
//       <DialogActions
//         className={classes.ccrt__blog__editor__choose__img__bottom__container}
//       >
//         <Typography
//           onClick={() => {
//             setOpenDialog(false);
//           }}
//           className={classes.ccrt__blog__editor__choose__img__cancel__button}
//         >
//           cancel
//         </Typography>
//         <Typography
//           onClick={() => {
//             onSaveCoverPicture();
//           }}
//           className={classes.ccrt__blog__editor__choose__img__save__button}
//         >
//           save
//         </Typography>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ImagePreviewDialog;
