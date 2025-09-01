import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
   console.log(`App is listening to port: ${process.env.PORT}`);
});
