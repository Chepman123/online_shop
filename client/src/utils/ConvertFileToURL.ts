let fileData: string | null = null;
export  default async function(file:File):Promise<string>{
  if (file instanceof File) {
    fileData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(file);
    });

    return fileData?fileData:'';
}
else return '';
}