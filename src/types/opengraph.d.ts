declare module 'open-graph-scraper' {
    import ogs from 'open-graph-scraper';

    export interface OgOptions {
        url?: string;
        timeout?: number;
        html?: string;
        blacklist?: string[];
        onlyGetOpenGraphInfo?: boolean;
        ogImageFallback?: boolean;
        customMetaTags?: string[];
        allMedia?: boolean;
        decompress?: boolean;
        followRedirect?: boolean;
        maxRedirects?: number;
        retry?: number;
        headers?: any;
        peekSize?: number;
        agent?: string;
        downloadLimit?: number;
        urlValidatorSettings?: URLValidatorSettings;
    }
    
    export interface URLValidatorSettings {
        protocols?:                 string[];
        requireTLD?:                boolean;
        requireProtocol?:           boolean;
        requireHost?:               boolean;
        requireValidProtocol?:      boolean;
        allowUnderscores?:          boolean;
        hostWhitelist?:             boolean;
        hostBlacklist?:             boolean;
        allowTrailingDot?:          boolean;
        allowProtocolRelativeUrls?: boolean;
        disallowAuth?:              boolean;
    }
    
    export interface OgsReturn {
        error:    boolean;
        result?:   any;
        response?: object;
    }
    
    
    export interface OgResult {
        favicon:        string;
        ogTitle:       string;
        ogDescription: string;
        ogType:        string;
        ogUrl:         string;
        ogImage:       OgImage;
        requestUrl:    string;
        success:       boolean;
    }
    
    export interface OgImage {
        url?:    string;
        width?:  string;
        height?: string;
        type?:   string;
    }
    
    export default function (options:OgOptions): Promise<OgsReturn>;
}

