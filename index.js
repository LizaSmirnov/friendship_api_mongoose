
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server ${activity} running on port ${PORT}!`);
    });
});