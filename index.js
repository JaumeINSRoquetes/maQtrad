let model, webcam, prediccions, maxPrediccions;
async function inicia_video() {
    const codi_model = "Y4SymB5UV"    // substitueix els asteriscs pel codi del model d'IA que vas crear en una activitat anterior
    const tmURL = "https://teachablemachine.withgoogle.com/models/" + codi_model;
    const modelURL = tmURL + "/model.json";
    const metadataURL = tmURL + "/metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPrediccions = model.getTotalClasses();    // nombre de tipus d'imatges per reconèixer
    webcam = new tmImage.Webcam(600, 600, true);    // posada en marxa de la webcam
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);    // bucle
    document.getElementById("text_inicial").style.display = "none";
    document.getElementById("coincidencia").style.display = "flex";    // mostra el text amb la predicció de coincidències
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    prediccions = document.getElementById("prediccions");
    for (let i = 0; i < maxPrediccions; i++) {
        prediccions.appendChild(document.createElement("div"));    // es crea un contenidor per a la coincidència de cada tipus d'imatge
    }
}
async function loop() {
    webcam.update();
    await prediu();
    window.requestAnimationFrame(loop);
}
async function prediu() {
    const prediccio = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPrediccions; i++) {
        const classe = prediccio[i].className + ": " + prediccio[i].probability.toFixed(2);    // es conserven dues xifres decimals
        prediccions.childNodes[i].innerHTML = classe;
    }
}
