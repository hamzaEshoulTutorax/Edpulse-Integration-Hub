"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeJobMatch = void 0;
// backend/src/services/ai.ts
const mistralai_1 = require("@mistralai/mistralai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new mistralai_1.Mistral({ apiKey: process.env.MISTRAL_API_KEY || "" });
const analyzeJobMatch = async (jobData, applicantsData) => {
    try {
        const response = await client.chat.complete({
            model: "mistral-large-latest",
            messages: [
                {
                    role: "system",
                    content: "Tu es un expert en recrutement éducatif. Fournis des analyses équilibrées qui mettent en avant les éléments clés tout en restant informatif. Concentre-toi sur les informations pertinentes qui aident à la prise de décision.",
                },
                {
                    role: "user",
                    content: `
            Analyse ce matching tuteur-mandat pour Tutorax.

            MANDAT:
            ${JSON.stringify(jobData, null, 2)}
            
            TUTEURS:
            ${JSON.stringify(applicantsData, null, 2)}
            
            Critères d'évaluation (par ordre d'importance):
            1. Formation et qualifications
                - Niveau d'études
                - Certifications pertinentes
                - Spécialisations

            2. Expérience d'enseignement
                - Années d'expérience
                - Types de cours donnés
                - Résultats obtenus

            3. Expertise dans la matière
                - Niveau de maîtrise
                - Domaines de spécialité
                - Expérience pratique

            4. Compatibilité avec le mandat
                - Disponibilité
                - Localisation
                - Tarification
                - Correspondance avec les besoins spécifiques

            Pour chaque tuteur, fournis:
            - Un score sur 10 basé sur les critères ci-dessus
            - 3-4 points forts significatifs avec données concrètes
            - 2-3 points d'attention pertinents si nécessaire
            - Une analyse de 2-3 phrases résumant les points décisifs

            Format JSON requis:
            {
              "recommendations": [
                {
                  "contractorId": number,
                  "name": string,
                  "score": number,
                  "matchingPoints": string[], // 3-4 points avec données concrètes
                  "concernPoints": string[], // 2-3 points si pertinent
                  "overallRank": number,
                  "analysis": string // 2-3 phrases clés
                }
              ]
            }
            
            IMPORTANT: 
            - Réponse en français uniquement
            - Respecter le format JSON
            - Scores sur 10 basés sur des critères objectifs
            - Trier par score décroissant
            - Mettre en avant les éléments différenciants
            - Inclure des données concrètes dans les points forts
            - Rester factuel et objectif
            - L'analyse doit aider à la prise de décision
          `,
                },
            ],
            temperature: 0.4,
            maxTokens: 4000,
            topP: 0.9,
        });
        if (!response.choices?.[0]?.message?.content) {
            throw new Error("Pas de réponse de l'IA");
        }
        const content = response.choices[0].message.content;
        const cleanedContent = typeof content === "string"
            ? content.replace(/^```json\n/, "").replace(/\n```$/, "")
            : content
                .map((chunk) => String(chunk))
                .join("")
                .replace(/^```json\n/, "")
                .replace(/\n```$/, "");
        const aiResponse = JSON.parse(cleanedContent);
        if (!aiResponse.recommendations ||
            !Array.isArray(aiResponse.recommendations)) {
            throw new Error("Format de réponse invalide");
        }
        return aiResponse.recommendations;
    }
    catch (error) {
        console.error("AI Analysis Error:", error);
        throw new Error("Erreur lors de l'analyse IA des candidats");
    }
};
exports.analyzeJobMatch = analyzeJobMatch;
