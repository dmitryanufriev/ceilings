import * as axios from "axios";
import { InstagramConfiguration } from "../configuration/InstagramConfiguration";
import { ImageInstagram } from "./ImageInstagram";

export class ImagesInstagramRecent {
    private URL = "https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN";
    private axiosInstance: axios.AxiosStatic;
    private configuration: InstagramConfiguration;
    private resolution: string;

    constructor(configuration: InstagramConfiguration) {
        this.axiosInstance = axios.default;
        this.configuration = configuration;
    }

    public async images(): Promise<ImageInstagram[]> {
        const response = await this.axiosInstance.get(
            this.URL.replace("access_token=ACCESS-TOKEN", `access_token=${this.configuration.accessToken()}`)
        );
        return response
                    .data
                    .data
                    .filter((json: any) => json.type === "image")
                    .map((json: any) => new ImageInstagram(
                        json.id,
                        json.link,
                        json.images
                    ));
    }
}
