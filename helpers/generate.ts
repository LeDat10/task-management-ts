export const generateRadomString = (length: number): string => {
    const characters: string = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqstuvwxyz0123456789";

    let result: string = "";
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

export const generateRadomNumber = (length: number): string => {
    const characters: string = "0123456789";

    let result: string = "";
    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}