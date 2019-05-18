interface ProjectConfig {
    PORT: string,
    secret: string

}

export const config: ProjectConfig = {
    PORT: process.env.PORT || '3000',
    secret:"UayebElCrack"
} 