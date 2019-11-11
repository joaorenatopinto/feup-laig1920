attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() {

gl_Position = vec4(aVertexPosition, 1.0);

vTextureCoord = aTextureCoord;

}

//A imagem final da câmara de segurança deverá ter linhas horizontais brancas que se sobrepõem à imagem original (por adição de cor). 
//Use as coordenadas de textura para calcular a intensidade da linha num dado pixel. As linhas deverão ser animadas, movendo-se de baixo para cima, usando um valor de tempo.