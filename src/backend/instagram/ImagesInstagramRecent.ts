import * as axios from "axios";
import {IConfiguration} from "../configuration/IConfiguration";
import {IImageInstagram} from "./IImageInstagram";
import {IImagesInstagram} from "./IImagesInstagram";
import {ImageInstagram} from "./ImageInstagram";

export class ImagesInstagramRecent implements IImagesInstagram {
    private URL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN";
    private axiosInstance: axios.AxiosStatic;
    private instagram: IConfiguration;
    private resolution: string;

    constructor(instagram: IConfiguration, resolution: string) {
        this.axiosInstance = axios.default;
        this.instagram = instagram;
        this.resolution = resolution;
    }

    public async images(): Promise<IImageInstagram[]> {
        const accessToken = this.instagram.value(
            "accessToken"
        );
        const response = await this.axiosInstance.get(
            this.URL.replace("access_token=ACCESS-TOKEN", `access_token=${accessToken}`)
        );
        return response
            .data
            .data
            .filter(
                (json: any) => json.type === "image"
            )
            .map(
                (json: any) => new ImageInstagram(
                    json.id,
                    json.link,
                    this.resolution,
                    json.images
                )
            );
    }
}
