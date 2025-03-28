"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeJobMatch = void 0;
// src/services/analysis/helpers/aiAnalysis.ts
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
                    content: "Tu es un expert en jumelage éducatif. Fournis des analyses équilibrées qui mettent en avant les éléments clés tout en restant informatif. Concentre-toi sur les informations pertinentes qui aident à la prise de décision.",
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
  1. Compatibilité des disponibilités (CRITÈRE PRIORITAIRE)
      - Analyser attentivement la section "Disponibilité(s)" dans la description du mandat
      - La comparer avec les disponibilités mentionnées dans contractor_application_note
      - Évaluer la concordance exacte des plages horaires
      - Identifier les conflits potentiels
  
  2. Correspondance des compétences
      - Comparer les required_skills du mandat avec les skills du tuteur
      - Vérifier la correspondance exacte des matières ET des niveaux
      - Porter une attention particulière au qual_level demandé
      - Donner priorité aux tuteurs ayant de l'expérience dans le niveau exact requis

  3. Formation et expérience
      - Analyser education_background pour la pertinence des études
      - Évaluer teaching_experience_details pour l'expérience spécifique
      - Considérer teaching_experience_hours comme indicateur quantitatif
      - Valoriser l'expérience dans la matière et le niveau demandés

  4. Autres critères de compatibilité 
      - Vérifier la compatibilité du contractor_pay_rate avec le tarif proposé
      - Si spécifié dans client_note, respecter les préférences de genre (gender)
      - Évaluer le professionnalisme dans contractor_application_note
      - Analyser la motivation exprimée dans la note d'application

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
  - La disponibilité est un critère essentiel dans l'analyse
  - Les concordances de matière ET niveau sont également essentielles
  - Inclure des données précises dans l'analyse (heures dispo, niveau d'études, etc.)
  - Mentionner explicitement les incompatibilités d'horaire ou de niveau
  - Rester factuel et objectif
  - Trier par score décroissant
  - L'analyse doit clairement justifier le score attribué
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
