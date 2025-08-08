
'use client';
import React from 'react';

// --- LECTURE DATA ---
// This data is kept separate for clarity and is equivalent to the original script's data.
const lecturesData = [
    // LECTURE 1: Anatomy
    {
        id: 'l1',
        name: 'L1 Anatomy',
        mcqs: [
            { q: "1. Which of the following correctly describes the boundaries of the oral vestibule?", o: ["Anteriorly: Cheeks; Posteriorly: Palate", "Anteriorly: Lips; Laterally: Cheeks; Posteriorly and medially: Teeth and gums", "Superiorly: Hard palate; Inferiorly: Tongue", "Anteriorly: Gums; Posteriorly: Floor of the mouth", "Laterally: Lips; Medially: Floor of the mouth"], a: "b) Anteriorly: Lips; Laterally: Cheeks; Posteriorly and medially: Teeth and gums" },
            { q: "2. What is the superior boundary of the oral cavity proper?", o: ["Floor of the mouth", "Lips", "Palate", "Cheeks", "Anterior two-thirds of the tongue"], a: "c) Palate" },
            { q: "3. Which nerve is responsible for sensory innervation of the floor of the mouth?", o: ["Greater palatine nerve", "Nasopalatine nerve", "Buccal nerve", "Lingual nerve", "Facial nerve"], a: "d) Lingual nerve" },
            { q: "4. How long is the pharynx as described in the lecture?", o: ["3 inches", "4 inches", "5 inches", "6 inches", "7 inches"], a: "c) 5 inches" },
            { q: "5. The pharynx extends from the base of the skull to which vertebral level?", o: ["C4", "C5", "C6", "T1", "T2"], a: "c) C6" },
            { q: "6. Which feature is NOT associated with the nasopharynx?", o: ["Communication with nasal cavities via choanae", "Presence of the pharyngeal tonsil (adenoid)", "Contains the opening of the auditory tube", "Bounded inferiorly by the oropharyngeal isthmus at the level of the soft palate", "Direct communication with the laryngeal inlet"], a: "e) Direct communication with the laryngeal inlet" },
            { q: "7. What is the primary boundary between the oropharynx and the laryngopharynx?", o: ["The pharyngeal isthmus", "The level of the soft palate", "The upper border of the epiglottis", "The lower border of the cricoid cartilage", "The base of the skull"], a: "c) The upper border of the epiglottis" },
            { q: "8. Which of the following is a feature of the laryngopharynx?", o: ["Contains the pharyngeal tonsils", "Extends upward into the nasal cavity", "Features the piriform fossa on each lateral wall", "Has a wide superior opening into the nose", "Bounded laterally by the middle constrictor muscles only"], a: "c) Features the piriform fossa on each lateral wall" },
            { q: "9. What clinical significance is associated with the piriform fossa?", o: ["It serves as the primary location for saliva secretion", "It is the site for impaction of foreign bodies, which may damage the internal laryngeal nerve", "It is the main communication point between the oral cavity and pharynx", "It acts as the passage for the superior laryngeal artery", "It is the location where the pharyngeal tonsils reside"], a: "b) It is the site for impaction of foreign bodies, which may damage the internal laryngeal nerve" },
            { q: "10. The superior constrictor muscle of the pharynx originates from which structure?", o: ["Stylohyoid ligament", "Hyoid bone", "Thyroid cartilage", "Pterygo-mandibular ligament and its bony attachment", "Cricoid cartilage"], a: "d) Pterygo-mandibular ligament and its bony attachment" },
            { q: "11. Where do the fibers of the pharyngeal constrictor muscles insert?", o: ["On the base of the skull", "Into the fibrous median raphe extending between the pharyngeal tubercle and cricoid cartilage", "On the lateral walls of the pharynx", "On the inner surface of the thyroid cartilage", "Into the soft palate"], a: "b) Into the fibrous median raphe extending between the pharyngeal tubercle and cricoid cartilage" },
            { q: "12. Which structures are contained in the 1st pharyngeal gap?", o: ["Internal laryngeal nerve and superior laryngeal artery", "9th cranial nerve and stylopharyngeus muscle", "Tensor palati, levator palati muscles, Eustachian tube, and ascending palatine artery", "Recurrent laryngeal nerve and inferior laryngeal vessels", "Palatopharyngeus and salpingopharyngeus muscles"], a: "c) Tensor palati, levator palati muscles, Eustachian tube, and ascending palatine artery" },
            { q: "13. The 2nd pharyngeal gap contains which nerve-muscle pair?", o: ["Internal laryngeal nerve and superior laryngeal artery", "9th cranial nerve and the stylopharyngeus muscle", "Recurrent laryngeal nerve and inferior laryngeal vessels", "Glossopharyngeal nerve and palatopharyngeus muscle", "Vagus nerve and salpingopharyngeus muscle"], a: "b) 9th cranial nerve and the stylopharyngeus muscle" },
            { q: "14. Which structure is found in the 3rd pharyngeal gap?", o: ["Recurrent laryngeal nerve and inferior laryngeal vessels", "9th cranial nerve and stylopharyngeus muscle", "Internal laryngeal nerve and superior laryngeal artery", "Tensor palati muscle and Eustachian tube", "Lingual nerve and ascending palatine artery"], a: "c) Internal laryngeal nerve and superior laryngeal artery" },
            { q: "15. What structures pass through the 4th pharyngeal gap?", o: ["Glossopharyngeal nerve and ascending palatine artery", "Internal laryngeal nerve and superior laryngeal artery", "Recurrent laryngeal nerve and inferior laryngeal vessels", "Vagus nerve and pharyngeal branches of the sympathetic ganglion", "Tubal elevation and salpingopharyngeal fold"], a: "c) Recurrent laryngeal nerve and inferior laryngeal vessels" },
            { q: "16. Which of the following arteries contributes to the arterial supply of the pharynx?", o: ["Inferior thyroid artery only", "Left gastric artery exclusively", "Ascending pharyngeal, ascending palatine, and greater palatine arteries among others", "Bronchial artery solely", "Subclavian artery directly"], a: "c) Ascending pharyngeal, ascending palatine, and greater palatine arteries among others" },
            { q: "17. The pharyngeal plexus is formed by branches of which of the following?", o: ["Only the vagus nerve", "Only the glossopharyngeal nerve", "Pharyngeal branch of the vagus, glossopharyngeal nerve, and superior cervical sympathetic ganglion", "Mandibular branch of the trigeminal and the facial nerve", "Hypoglossal nerve and internal laryngeal nerve"], a: "c) Pharyngeal branch of the vagus, glossopharyngeal nerve, and superior cervical sympathetic ganglion" },
            { q: "18. Which clinical finding is associated with enlarged nasopharyngeal tonsils (adenoids) in children?", o: ["Excessive salivation", "Nasal obstruction with mouth breathing and protrusion of the tongue", "Sudden loss of taste", "Difficulty in mastication", "Deviation of the uvula"], a: "b) Nasal obstruction with mouth breathing and protrusion of the tongue" },
            { q: "19. Which esophageal constriction is located at the junction with the stomach?", o: ["6 inches from the incisor", "9 inches from the incisor", "12 inches from the incisor", "15 inches from the incisor", "At the level of T10 vertebra"], a: "d) 15 inches from the incisor" },
            { q: "20. What is the clinical significance of the close relationship between the esophagus and the left atrium?", o: ["It allows assessment of the left atrium's size by a barium swallow", "It facilitates direct endoscopic access to the heart", "It enhances arterial blood supply to both structures", "It prevents reflux of gastric contents", "It minimizes the risk of esophageal carcinoma"], a: "a) It allows assessment of the left atrium's size by a barium swallow" }
        ],
        written: [
            { q: "1. Discuss the structural differences between the oral vestibule and the oral cavity proper.", a: "<strong>Oral Vestibule:</strong> The <strong>oral vestibule</strong> is a slit‑like space bounded externally by the lips and cheeks and internally by the teeth and gums. It allows food manipulation and contains the openings of the parotid duct.<br><strong>Oral Cavity Proper:</strong> The <strong>oral cavity proper</strong> lies within the alveolar arches, roofed by the hard and soft palate, and floored by the anterior two‑thirds of the tongue and its mucosal reflections. It serves as the initial site of digestion, speech articulation, and taste." },
            { q: "2. Explain the clinical importance of the piriform fossa within the laryngopharynx.", a: "<strong>Piriform Fossa:</strong><br><em>Site of Impaction:</em> Common trap for fish bones and small foreign bodies, which can perforate the mucosa or migrate into surrounding tissues.<br><em>Nerve Risk:</em> Impaction or inflammation can injure the <em>internal laryngeal nerve</em>, causing anesthesia of the supraglottic mucosa and loss of cough reflex on that side.<br><em>Infection Potential:</em> Accumulated debris may lead to abscess formation, requiring prompt otolaryngologic evaluation." },
            { q: "3. Outline the contents of each of the four pharyngeal gaps and explain their significance.", a: "<strong>1st Gap (above Superior Constrictor):</strong> <em>Levator veli palatini</em>, <em>tensor veli palatini</em>, <em>auditory (Eustachian) tube</em>, <em>ascending palatine artery</em>.<br><strong>2nd Gap (between Superior & Middle Constrictors):</strong> <em>Stylopharyngeus muscle</em>, <em>glossopharyngeal nerve (CN IX)</em>, <em>stylohyoid ligament</em>.<br><strong>3rd Gap (between Middle & Inferior Constrictors):</strong> <em>Internal laryngeal nerve</em>, <em>superior laryngeal artery & vein</em>.<br><strong>4th Gap (below Inferior Constrictor):</strong> <em>Recurrent laryngeal nerve</em>, <em>inferior laryngeal artery & vein</em>.<br><strong>Significance:</strong> These intervals permit passage of neurovascular structures critical for palate elevation, pharyngeal sensation, and laryngeal motor and sensory functions." },
            { q: "4. Describe the clinical implications of esophageal constrictions as mentioned in the lecture.", a: "<strong>Clinical Implications:</strong><br><em>Endoscopy Challenges:</em> Constrictions at C6 (pharyngoesophageal junction), T4 (aortic arch), T5 (left main bronchus), and T10 (esophageal hiatus) can impede esophagoscope advancement.<br><em>Foreign Body Lodgment:</em> Narrow points where coins, bones, or dentures commonly get stuck.<br><em>Pathology Sites:</em> Predilection sites for corrosive strictures and esophageal carcinoma formation due to stasis and mucosal injury." },
            { q: "5. Summarize the blood supply, venous drainage, and lymphatic drainage of the esophagus.", a: "<strong>Blood Supply:</strong><br><em>Upper third:</em> Inferior thyroid arteries.<br><em>Middle third:</em> Direct branches from thoracic aorta and bronchial arteries.<br><em>Lower third:</em> Left gastric artery (celiac trunk).<br><strong>Venous Drainage:</strong><br><em>Upper third:</em> Inferior thyroid veins.<br><em>Middle third:</em> Azygos and hemiazygos veins.<br><em>Lower third:</em> Left gastric vein (portal system), forming portocaval anastomosis.<br><strong>Lymphatic Drainage:</strong><br><em>Upper third:</em> Deep cervical nodes.<br><em>Middle third:</em> Superior/posterior mediastinal nodes.<br><em>Lower third:</em> Celiac and left gastric lymph nodes." }
        ]
    },
    // LECTURE 2: Histology
    {
        id: 'l2',
        name: 'L2 Histology',
        mcqs: [
            { q: "1. Which of the following best describes the outer surface of the lip?", o: ["A thick non-keratinized stratified squamous epithelium with abundant mucosal glands", "A thin skin composed of an epidermis and dermis containing sweat glands, hair follicles, and sebaceous glands", "A keratinized stratified squamous layer with a dense collagen core", "A transitional epithelium with areas of adipose tissue", "A mucous membrane exclusively lined by stratified cuboidal cells"], a: "b) A thin skin composed of an epidermis and dermis containing sweat glands, hair follicles, and sebaceous glands" },
            { q: "2. The inner surface of the lip is lined by which type of epithelium?", o: ["Keratinized stratified squamous epithelium", "Simple columnar epithelium", "Non-keratinized stratified squamous epithelium", "Transitional epithelium", "Pseudostratified ciliated columnar epithelium"], a: "c) Non-keratinized stratified squamous epithelium" },
            { q: "3. The vermilion zone of the lip is best characterized by:", o: ["A region with abundant sweat and sebaceous glands", "A transitional zone with thin, keratinized stratified squamous epithelium and no labial salivary or sweat glands", "An area composed entirely of mucous membrane with deep rugae", "A thick dermal layer with numerous hair follicles", "A zone with dense adipose tissue separating the skin and mucosa"], a: "b) A transitional zone with thin, keratinized stratified squamous epithelium and no labial salivary or sweat glands" },
            { q: "4. Which statement correctly explains the core of the lip?", o: ["It is composed solely of adipose tissue without significant vasculature", "It consists of dense connective tissue enriched with sensory nerves and capillaries", "It is made up of hyaline cartilage providing structural support", "It contains layers of skeletal muscle with a thick keratin layer", "It is primarily a continuation of the epidermal layer into the lip margin"], a: "b) It consists of dense connective tissue enriched with sensory nerves and capillaries" },
            { q: "5. The mucosa covering the tongue is primarily made up of which components?", o: ["Simple squamous epithelium with loose connective tissue", "Stratified squamous epithelium and a lamina propria containing dense collagen and minor salivary glands", "Pseudostratified columnar epithelium with cilia", "Simple columnar epithelium with abundant goblet cells", "Transitional epithelium with an underlying muscular layer"], a: "b) Stratified squamous epithelium and a lamina propria containing dense collagen and minor salivary glands" },
            { q: "6. Which type of lingual papilla is the most numerous on the dorsal surface of the anterior two-thirds of the tongue?", o: ["Fungiform papillae", "Filiform papillae", "Foliate papillae", "Circumvallate papillae", "Retrovallate papillae"], a: "b) Filiform papillae" },
            { q: "7. The primary function of the filiform papillae is to:", o: ["Facilitate taste via numerous taste buds", "Provide a rough surface to aid in the movement and manipulation of food during chewing", "Secrete serous fluid to enhance taste reception", "Protect the tongue by forming a barrier against pathogens", "Absorb nutrients from food particles"], a: "b) Provide a rough surface to aid in the movement and manipulation of food during chewing" },
            { q: "8. Fungiform papillae on the tongue are best described as having which features?", o: ["They are the most numerous papillae with a heavily keratinized epithelium and absence of taste buds", "They are elongated and conical with no taste buds", "They are mushroom-shaped, possess a non-keratinized epithelium, and contain a few taste buds", "They are large, encircled by a deep cleft, and contain the majority of taste buds", "They are exclusively found on the posterior third of the tongue"], a: "c) They are mushroom-shaped, possess a non-keratinized epithelium, and contain a few taste buds" },
            { q: "9. Foliate papillae are recognized by all of the following EXCEPT:", o: ["Their large size (1–3 mm)", "Being the least common type on the tongue", "Their broad shape encircled by a cleft (moat-like)", "Containing numerous taste buds", "Being the most densely distributed papillae on the tongue"], a: "e) Being the most densely distributed papillae on the tongue" },
            { q: "10. Which papilla type is closely associated with the von Ebner glands?", o: ["Filiform papillae", "Fungiform papillae", "Circumvallate papillae", "Foliate papillae", "All of the above"], a: "c) Circumvallate papillae" },
            { q: "11. Taste buds are primarily found in which locations on the tongue?", o: ["Embedded in the filiform papillae", "Concentrated on the lateral surfaces of the circumvallate papillae", "Evenly distributed over both dorsal and ventral surfaces", "Exclusively in the fungiform papillae", "Located in the smooth epithelium of the posterior third"], a: "b) Concentrated on the lateral surfaces of the circumvallate papillae" },
            { q: "12. The structure of a taste bud consists of all the following cell types EXCEPT:", o: ["Tall columnar gustatory (taste) cells", "Supporting cells", "Basal cells responsible for cell turnover", "Keratinized squamous cells", "Cells with microvilli projecting towards a taste pore"], a: "d) Keratinized squamous cells" },
            { q: "13. The posterior third of the tongue is distinct in that it:", o: ["Exhibits hundreds of lingual papillae", "Contains lingual tonsils with a smooth stratified squamous epithelium and no papillae", "Has a heavily keratinized dorsal epithelium with prominent filiform papillae", "Lacks any associated lymphoid tissue", "Is lined by non-keratinized cuboidal epithelium with numerous taste buds"], a: "b) Contains lingual tonsils with a smooth stratified squamous epithelium and no papillae" },
            { q: "14. Which salivary gland is characterized as a pure serous gland with a thick fibrous capsule containing fat cells?", o: ["Parotid gland", "Submandibular gland", "Sublingual gland", "Minor salivary glands", "Mixed seromucous glands"], a: "a) Parotid gland" },
            { q: "15. Serous acini in the salivary glands are recognized by all the following features EXCEPT:", o: ["Pyramidal cell shape with deep basophilic cytoplasm", "Well-developed rough endoplasmic reticulum and Golgi apparatus", "Central and rounded nuclei", "Presence of apical electron-lucent mucous granules", "Surrounding myoepithelial (basket) cells"], a: "d) Presence of apical electron-lucent mucous granules" },
            { q: "16. Mucous acini in salivary glands primarily secrete:", o: ["Digestive enzymes such as amylase", "Hydrophilic mucins that facilitate lubrication", "Proline-rich proteins with antimicrobial properties", "Ion-transporting proteins", "Serous secretions rich in lysozyme"], a: "b) Hydrophilic mucins that facilitate lubrication" },
            { q: "17. Mixed (seromucous) acini are characterized by:", o: ["A predominance of serous cells with no mucous component", "A predominance of mucous cells along with serous demilune (crescent) formations", "A completely balanced mixture of serous and mucous cells", "Lack of surrounding myoepithelial cells", "Cells that are incapable of secreting either mucin or enzymes"], a: "b) A predominance of mucous cells along with serous demilune (crescent) formations" },
            { q: "18. What is the primary function of myoepithelial (basket) cells in salivary glands?", o: ["They produce and store mucins", "They form the ductal lining of the gland", "They contract to help expel secretions from the acini", "They are responsible for the synthesis of α-amylase", "They serve as structural support without any contractile function"], a: "c) They contract to help expel secretions from the acini" },
            { q: "19. The striated ducts in salivary glands function to:", o: ["Secrete digestive enzymes directly", "Reabsorb sodium ions from the acinar secretions, rendering the saliva hypotonic", "Simply convey saliva without modification", "Provide a passage exclusively for mucous secretions", "Store secretions until needed"], a: "b) Reabsorb sodium ions from the acinar secretions, rendering the saliva hypotonic" },
            { q: "20. Which of the following best describes the duct system in salivary glands?", o: ["It consists of one uniform duct type lined solely by stratified squamous epithelium", "It includes intercalated ducts, striated ducts, interlobular ducts, interlobar ducts, and a main duct with varying epithelial linings opening into the mouth", "It is made up exclusively of intercalated ducts that secrete enzymes", "It lacks any structural division by fibrous septa", "It only contains ducts lined by non-keratinized cuboidal epithelium"], a: "b) It includes intercalated ducts, striated ducts, interlobular ducts, interlobar ducts, and a main duct with varying epithelial linings opening into the mouth" }
        ],
        written: [
            { q: "1. Discuss the differences in epithelial lining between the outer surface, the inner mucosal surface, and the vermilion zone of the lip.", a: "<strong>Outer Surface:</strong><br><em>Skin:</em> Thin keratinized epithelium with epidermis/dermis, containing sweat glands, hair follicles, and sebaceous glands; protects against environmental trauma.<br><strong>Inner Mucosal Surface:</strong><br><em>Epithelium:</em> Thick, non‑keratinized stratified squamous with lamina propria rich in minor salivary glands; keeps mucosa moist and resilient.<br><strong>Vermilion Zone:</strong><br><em>Transitional Epithelium:</em> Very thin keratinized stratified squamous lacking glands, overlying dense capillary network—gives characteristic red color and high tactile sensitivity." },
            { q: "2. Explain the functional roles of the different types of lingual papillae.", a: "<strong>Filiform Papillae:</strong> Most numerous, conical and keratinized; provide friction to manipulate food.<br><strong>Fungiform Papillae:</strong> Mushroom‑shaped, less keratinized, scattered taste buds; detect sweet and umami.<br><strong>Foliate Papillae:</strong> Leaf‑shaped lateral folds with deep clefts; numerous taste buds sensitive to sour.<br><strong>Circumvallate Papillae:</strong> Large, dome‑shaped row anterior to sulcus terminalis, associated with von Ebner glands; important for bitter taste detection." },
            { q: "3. Describe the structure and turnover process of taste buds.", a: "<strong>Structure:</strong><br><em>Cell Types:</em> Gustatory (sensory) cells with apical microvilli projecting into taste pore; supporting cells; basal (stem) cells.<br><strong>Turnover:</strong><br><em>Renewal:</em> Basal cells proliferate and differentiate; entire taste bud renews every 7–10 days, essential for maintaining taste acuity and recovery after injury." },
            { q: "4. Compare and contrast the parotid, submandibular, and sublingual salivary glands in terms of their histological features and secretory functions.", a: "<strong>Parotid Gland:</strong><br><em>Histology:</em> Pure serous acini, thick capsule, prominent interlobar fat; secretes watery, enzyme‑rich saliva (α‑amylase).<br><strong>Submandibular Gland:</strong><br><em>Histology:</em> Mixed serous and mucous acini (predominantly serous), moderate capsule with fat; produces both enzymes and mucins for lubrication.<br><strong>Sublingual Gland:</strong><br><em>Histology:</em> Mostly mucous acini, thin capsule, few serous demilunes; secretes viscous mucin‑rich saliva for mucosal protection." },
            { q: "5. Outline the organization of the duct system in salivary glands, focusing on the roles of intercalated and striated ducts.", a: "<strong>Intercalated Ducts:</strong><br><em>Lining:</em> Simple cuboidal cells directly from acini; conduct primary saliva.<br><em>Role:</em> Minor modification—secrete bicarbonate, absorb some Cl⁻.<br><strong>Striated Ducts:</strong><br><em>Lining:</em> High columnar cells with basal mitochondrial striations; large surface area.<br><em>Role:</em> Reabsorb Na⁺, secrete K⁺—produce hypotonic saliva.<br><strong>Excretory Ducts:</strong><br><em>Pathway:</em> Interlobular → interlobar → main duct; epithelium transitions to stratified columnar/squamous before oral opening." }
        ]
    }
];

// --- STYLES ---
// All original CSS is included here to maintain the exact look and feel.
const GlobalStyles = () => (
    <style>{`
        /* --- CSS Variables --- */
        :root {
            /* Fonts */
            --qa-font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            --header-font: 'Coiny', cursive;
            --section-title-font: 'Calistoga', serif;
            --question-header-font: var(--qa-font-family);
            --base-font: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

            /* Light Theme Colors */
            --page-bg: #f5f7fa;
            --text-color: #333;
            --container-bg: white;
            --container-shadow: 0 4px 15px rgba(0,0,0,0.1);
            --header-text: #1f2937;
            --header-border: #e5e7eb;
            --tab-bg: white;
            --tab-border: #cbd5e1;
            --tab-text: #334155;
            --tab-hover-bg: #f8fafc;
            --tab-hover-border: #94a3b8;
            --tab-hover-text: #0f172a;
            --tab-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --tab-hover-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --tab-active-border: #1d4ed8;
            --tab-active-bg: #2563eb;
            --tab-active-gradient: linear-gradient(to right, #3b82f6, #4f46e5);
            --section-title-bg-light: linear-gradient(135deg, #3b82f6, #1e40af);
            --section-title-bg-dark: #2563eb;
            --question-bg: #f8fafc;
            --question-border: #3b82f6;
            --question-shadow: 0 1px 3px rgba(0,0,0,0.05);
            --question-header-text: #dc2626;
            --explanation-bg: #ecfdf5;
            --explanation-border: #10b981;
            --explanation-text: #374151;
            --explanation-strong-text: #111827;
            --written-expl-bg: #f0fdfa;
            --written-expl-border: #99f6e4;
            --written-expl-text: #374151;
            --written-expl-strong-text: #111827;
            --written-label-text: #0d9488;
            --mcq-option-bg: #ffffff;
            --mcq-option-border: #e5e7eb;
            --mcq-option-text: #333;
            --mcq-option-hover-bg: #f9fafb;
            --mcq-option-hover-border: #d1d5db;
            --show-answer-gradient: linear-gradient(135deg, #60a5fa, #3b82f6);
            --show-answer-hover-gradient: linear-gradient(135deg, #3b82f6, #2563eb);
            --show-answer-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
            --show-answer-hover-shadow: 0 3px 6px rgba(59, 130, 246, 0.3);
            --toggle-bg: #f3f4f6;
            --toggle-text: #4b5563;
            --toggle-hover-bg: #e5e7eb;
            --toggle-hover-text: #2563eb;
            --toggle-focus-ring: #3b82f6;
            --fade-bg: white;
        }

        /* --- Dark Mode Variable Overrides --- */
        html.dark {
            --page-bg: #0f172a;
            --text-color: #cbd5e1;
            --container-bg: #1e293b;
            --container-shadow: 0 4px 15px rgba(0,0,0,0.5);
            --header-text: #f1f5f9;
            --header-border: #334155;
            --tab-bg: #334155;
            --tab-border: #475569;
            --tab-text: #cbd5e1;
            --tab-hover-bg: #1e293b;
            --tab-hover-border: #475569;
            --tab-hover-text: #f1f5f9;
            --tab-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.2);
            --tab-hover-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25);
            --tab-active-border: #1d4ed8;
            --tab-active-bg: #2563eb;
            --tab-active-gradient: none;
            --section-title-bg-dark: #2563eb;
            --question-bg: #1e293b;
            --question-border: #60a5fa;
            --question-shadow: 0 1px 3px rgba(0,0,0,0.2);
            --question-header-text: #f87171;
            --explanation-bg: #065f46;
            --explanation-border: #34d399;
            --explanation-text: #d1fae5;
            --explanation-strong-text: #a7f3d0;
            --written-expl-bg: #115e59;
            --written-expl-border: #5eead4;
            --written-expl-text: #ccfbf1;
            --written-expl-strong-text: #99f6e4;
            --written-label-text: #2dd4bf;
            --mcq-option-bg: #334155;
            --mcq-option-border: #4b5563;
            --mcq-option-text: #cbd5e1;
            --mcq-option-hover-bg: #1e293b;
            --mcq-option-hover-border: #334155;
            --show-answer-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
            --show-answer-hover-shadow: 0 3px 6px rgba(59, 130, 246, 0.15);
            --toggle-bg: #334155;
            --toggle-text: #9ca3af;
            --toggle-hover-bg: #1e293b;
            --toggle-hover-text: #facc15;
            --toggle-focus-ring: #60a5fa;
            --fade-bg: #0f172a;
        }

        /* --- Base screen styles --- */
        body {
            font-family: var(--base-font);
            background-color: var(--page-bg);
            color: var(--text-color);
            font-size: 17px;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        .page-container {
            max-width: 1200px;
            margin: 20px auto;
            background-color: var(--container-bg);
            box-shadow: var(--container-shadow);
            padding: 30px;
            overflow-x: hidden;
            border-radius: 12px;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .header {
            background: none;
            color: var(--header-text);
            border-radius: 0;
            padding: 25px 0;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
            border-bottom: 2px solid var(--header-border);
            transition: color 0.3s ease, border-color 0.3s ease;
            position: relative;
        }
        #theme-toggle-btn {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            padding: 0.5rem;
            border-radius: 9999px;
            color: var(--toggle-text);
            background-color: var(--toggle-bg);
            border: none;
            cursor: pointer;
            transition: background-color 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out;
            overflow: hidden;
        }
        #theme-toggle-btn:hover {
            background-color: var(--toggle-hover-bg);
            color: var(--toggle-hover-text);
            transform: translateY(-50%) scale(1.1);
        }
        #theme-toggle-btn:active {
            transform: translateY(-50%) scale(1);
        }
        #theme-toggle-btn:focus { outline: none; }
        #theme-toggle-btn:focus-visible {
            outline: 2px solid var(--toggle-focus-ring);
            outline-offset: 2px;
        }
        #theme-toggle-btn .icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s ease-in-out;
        }
        html.dark #theme-toggle-btn .icon-wrapper { transform: rotate(-180deg); }
        html:not(.dark) #theme-toggle-btn .icon-wrapper { transform: rotate(0deg); }
        #theme-toggle-btn svg {
            width: 1.5rem;
            height: 1.5rem;
        }
        .header-img {
            height: 80px;
            width: 80px;
            object-fit: contain;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header h1 {
            font-family: var(--header-font);
            font-size: 3.5rem;
            margin-bottom: 0;
            color: var(--header-text);
            text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            position: relative;
            top: 5px;
            transition: color 0.3s ease;
        }

        /* --- Styles for Lecture Tabs --- */
        #lecture-tabs-wrapper {
            position: relative;
            padding: 0 10px;
            border-bottom: 2px solid var(--header-border);
            margin-bottom: 25px;
            padding-bottom: 15px;
            transition: border-color 0.3s ease;
        }
        #lecture-tabs {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            gap: 12px;
            padding: 5px 2px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            scroll-behavior: smooth;
        }
        #lecture-tabs::-webkit-scrollbar { display: none; }
        #lecture-tabs button.lecture-tab-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            white-space: nowrap;
            border-radius: 9999px;
            border-width: 1px;
            text-align: center;
            font-weight: 500;
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            box-shadow: var(--tab-shadow);
            transition: color 0.3s ease-out, background-color 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out, background 0.3s ease-out;
            transform: scale(1);
            background-color: var(--tab-bg);
            border-color: var(--tab-border);
            color: var(--tab-text);
            background-image: none;
        }
        @media (min-width: 768px) {
            #lecture-tabs button.lecture-tab-btn {
                font-size: 1rem;
                padding: 0.5rem 1.25rem;
            }
        }
        #lecture-tabs button.lecture-tab-btn:not(.active):hover {
            background-color: var(--tab-hover-bg);
            border-color: var(--tab-hover-border);
            color: var(--tab-hover-text);
            box-shadow: var(--tab-hover-shadow);
            transform: translateY(-2px);
        }
        #lecture-tabs button.lecture-tab-btn.active {
            background-image: var(--tab-active-gradient);
            background-color: var(--tab-active-bg);
            border-color: var(--tab-active-border);
            color: white;
            font-weight: 600;
            box-shadow: none;
            transform: scale(1);
        }
        #lecture-tabs button.lecture-tab-btn.active:hover {
            box-shadow: none;
            filter: brightness(1.1);
            transform: translateY(-2px);
        }
        #lecture-tabs button.lecture-tab-btn:active { transform: scale(0.98); }
        #lecture-tabs button.lecture-tab-btn:focus { outline: none; }

        /* --- Overflow Indicators (Gradient Fades) --- */
        #lecture-tabs-wrapper::before,
        #lecture-tabs-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 15px;
            width: 50px;
            pointer-events: none;
            z-index: 2;
            opacity: 0;
            transition: opacity 0.3s ease-in-out, background 0.3s ease;
        }
        #lecture-tabs-wrapper::before {
            left: 0;
            background: linear-gradient(to right, var(--fade-bg) 40%, rgba(255,255,255,0));
        }
        #lecture-tabs-wrapper::after {
            right: 0;
            background: linear-gradient(to left, var(--fade-bg) 40%, rgba(255,255,255,0));
        }
        html.dark #lecture-tabs-wrapper::before {
            background: linear-gradient(to right, var(--fade-bg) 40%, rgba(15, 23, 42, 0));
        }
        html.dark #lecture-tabs-wrapper::after {
            background: linear-gradient(to left, var(--fade-bg) 40%, rgba(15, 23, 42, 0));
        }
        #lecture-tabs-wrapper.show-fade-left::before { opacity: 1; }
        #lecture-tabs-wrapper.show-fade-right::after { opacity: 1; }

        /* --- Content area styling --- */
        #dynamic-question-area {
            margin-top: 0;
            position: relative;
            min-height: 300px;
        }
        .lecture-content {
            opacity: 1;
            background-color: var(--container-bg);
            width: 100%;
            transition: background-color 0.3s ease;
        }
        
        /* --- Staggered fade-in animation --- */
        @keyframes staggerFadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .stagger-fade-in {
            animation: staggerFadeIn 0.7s ease-out forwards;
        }
        .question-animate {
            opacity: 0;
        }

        /* --- Section/Question Styles --- */
        .section-title {
            display: flex;
            align-items: center;
            background: var(--section-title-bg-light);
            color: white;
            border-radius: 12px;
            padding: 8px 20px;
            margin: 25px 0 20px 0;
            transition: background 0.3s ease;
        }
        html.dark .section-title {
            background: var(--section-title-bg-dark);
        }
        .section-title h2 {
            font-size: 1.4rem;
            font-weight: normal;
            font-family: var(--section-title-font);
            margin: 0;
            flex-grow: 1;
        }
        .section-title i {
            margin-right: 0.6rem;
            font-size: 1.2em;
        }
        .question {
            background-color: var(--question-bg);
            border-left: 5px solid var(--question-border);
            padding: 18px;
            margin: 20px 0;
            border-radius: 5px;
            box-shadow: var(--question-shadow);
            transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .question p.font-semibold {
            font-family: var(--question-header-font);
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--question-header-text);
            font-size: 1.05em;
            line-height: 1.5;
            transition: color 0.3s ease;
        }

        /* --- Explanation/Answer Styles --- */
        .explanation {
            font-family: var(--qa-font-family);
            background-color: var(--explanation-bg);
            border-left: 5px solid var(--explanation-border);
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .explanation p {
            font-family: var(--qa-font-family);
            font-size: 14px;
            color: var(--explanation-text);
            line-height: 1.6;
            transition: color 0.3s ease;
        }
        .explanation p strong {
            color: var(--explanation-strong-text);
            font-weight: bold;
            transition: color 0.3s ease;
        }
        .written-answer-label {
            font-family: var(--qa-font-family);
            font-weight: bold;
            color: var(--written-label-text);
            margin-bottom: 6px;
            font-size: 1.1em;
            transition: color 0.3s ease;
        }
        .written-explanation {
            font-family: var(--qa-font-family);
            background-color: var(--written-expl-bg);
            border: 1px solid var(--written-expl-border);
            padding: 18px;
            border-radius: 8px;
            margin-top: 8px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
            transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .written-explanation p {
            font-family: var(--qa-font-family);
            font-size: 14px;
            color: var(--written-expl-text);
            line-height: 1.6;
            transition: color 0.3s ease;
        }
        .written-explanation strong {
            font-weight: bold;
            color: var(--written-expl-strong-text);
            transition: color 0.3s ease;
        }
        .written-explanation em { font-style: italic; color: var(--written-label-text); transition: color 0.3s ease;}
        .mcq-option {
            font-family: var(--qa-font-family);
            padding: 8px 12px;
            margin: 6px 0;
            border-radius: 6px;
            border: 1px solid var(--mcq-option-border);
            background-color: var(--mcq-option-bg);
            font-size: 14px;
            color: var(--mcq-option-text);
            transition: background-color 0.2s, border-color 0.2s, color 0.3s ease;
        }
        .mcq-option:hover {
            background-color: var(--mcq-option-hover-bg);
            border-color: var(--mcq-option-hover-border);
        }
        .written-question-container {
            margin-bottom: 12px;
        }

        /* --- Show Answer Button Styles --- */
        .show-answer-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            background: var(--show-answer-gradient);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 600;
            transition: background 0.2s ease-in-out, transform 0.1s ease, box-shadow 0.2s ease;
            margin-top: 12px;
            box-shadow: var(--show-answer-shadow);
            min-width: 110px;
            text-align: center;
        }
        .show-answer-btn:hover {
            background: var(--show-answer-hover-gradient);
            box-shadow: var(--show-answer-hover-shadow);
        }
        .show-answer-btn:active {
            transform: scale(0.97);
            box-shadow: 0 1px 2px rgba(59, 130, 246, 0.15);
        }

        /* --- Answer Container Animation --- */
        .answer-container {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            margin-top: 0;
            transition: grid-template-rows 0.4s ease-in-out, opacity 0.3s ease-in-out 0.1s, margin-top 0.4s ease-in-out;
        }
        .answer-container.answer-visible {
            grid-template-rows: 1fr;
            opacity: 1;
            margin-top: 0.75rem;
        }
        .answer-container > div {
            overflow: hidden;
        }

        /* --- Mobile-Specific Styles --- */
        @media (max-width: 768px) {
            body {
                font-size: 15px;
            }
            .page-container {
                padding: 15px;
                margin: 10px auto;
                border-radius: 8px;
            }
            .header {
                padding: 15px 0;
                gap: 10px;
                margin-bottom: 15px;
            }
            #theme-toggle-btn {
                right: 5px;
                padding: 0.4rem;
            }
            #theme-toggle-btn svg {
                width: 1.3rem;
                height: 1.3rem;
            }
            .header h1 {
                font-size: 2.5rem;
                top: -5px;
            }
            .header-img {
                height: 60px;
                width: 60px;
            }
            #lecture-tabs-wrapper {
                padding: 0 5px;
                padding-bottom: 10px;
                margin-bottom: 15px;
            }
            #lecture-tabs {
                gap: 8px;
                padding: 5px 1px;
            }
            #lecture-tabs button.lecture-tab-btn {
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
            }
            #lecture-tabs-wrapper::before,
            #lecture-tabs-wrapper::after {
                width: 40px;
                bottom: 10px;
            }
            .section-title {
                padding: 3px 15px;
                border-radius: 12px;
                margin: 20px 0 15px 0;
            }
            .section-title h2 {
                font-size: 1.2rem;
            }
            .section-title i {
                font-size: 1.1em;
                margin-right: 0.5rem;
            }
            .question {
                padding: 15px;
                margin: 15px 0;
                border-radius: 5px;
            }
            .question p.font-semibold {
                font-size: 1em;
            }
            .explanation, .written-explanation {
                padding: 12px;
                border-radius: 6px;
            }
            .mcq-option {
                font-size: 0.85em;
                padding: 6px 10px;
                border-radius: 4px;
            }
            .explanation p, .written-explanation p {
                font-size: 0.85em;
            }
            .written-answer-label {
                font-size: 1em;
            }
            .show-answer-btn {
                font-size: 0.85em;
                padding: 5px 10px;
                border-radius: 12px;
                min-width: 100px;
            }
            .answer-container.answer-visible {
                margin-top: 0.6rem;
            }
        }
    `}</style>
);

// --- HELPER & CHILD COMPONENTS ---

const ThemeToggleButton = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';
    return (
        <button
            type="button"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="icon-wrapper">
                <svg style={{ display: isDark ? 'block' : 'none' }} className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                <svg style={{ display: isDark ? 'none' : 'block' }} className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
        </button>
    );
};

const Question = ({ questionData, type, lectureId, index }) => {
    const [isAnswerVisible, setAnswerVisible] = React.useState(false);
    const answerId = `answer-${type}-${lectureId}-${index}`;

    const toggleAnswer = () => {
        setAnswerVisible(prev => !prev);
    };

    return (
        <div className="question question-animate">
            {type === 'mcq' ? (
                <>
                    <p className="font-semibold">{questionData.q}</p>
                    <div className="mt-2 mb-2">
                        {questionData.o.map((option, i) => (
                            <div key={i} className="mcq-option">
                                {`${String.fromCharCode(97 + i)}) ${option}`}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="written-question-container">
                    <p className="font-semibold">{questionData.q}</p>
                </div>
            )}

            <button
                type="button"
                className="show-answer-btn"
                onClick={toggleAnswer}
                aria-expanded={isAnswerVisible}
                aria-controls={answerId}
            >
                {isAnswerVisible ? 'Hide Answer' : 'Show Answer'}
            </button>

            <div
                id={answerId}
                className={`answer-container ${isAnswerVisible ? 'answer-visible' : ''}`}
                role="region"
                aria-hidden={!isAnswerVisible}
            >
                <div>
                    {type === 'mcq' ? (
                        <div className="explanation">
                            <p><strong>Answer:</strong> {questionData.a}</p>
                        </div>
                    ) : (
                        <>
                            <p className="written-answer-label">Answer:</p>
                            <div className="written-explanation">
                                <p dangerouslySetInnerHTML={{ __html: questionData.a }} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const LectureContent = ({ lecture }) => {
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const questionsToAnimate = container.querySelectorAll('.question.question-animate');
        const baseDelay = 70; // ms

        questionsToAnimate.forEach((el, index) => {
            el.style.animationDelay = `${index * baseDelay}ms`;
            el.classList.add('stagger-fade-in');
        });
    }, [lecture]);

    if (!lecture) return null;

    return (
        <div ref={containerRef} className="lecture-content">
            {lecture.mcqs && lecture.mcqs.length > 0 && (
                <>
                    <div className="section-title">
                        <i className="fas fa-list-check"></i>
                        <h2 className="text-xl font-bold">{lecture.name} - MCQs:</h2>
                    </div>
                    {lecture.mcqs.map((mcq, index) => (
                        <Question key={`mcq-${index}`} questionData={mcq} type="mcq" lectureId={lecture.id} index={index} />
                    ))}
                </>
            )}
            {lecture.written && lecture.written.length > 0 && (
                <>
                    <div className="section-title mt-10">
                        <i className="fas fa-pencil"></i>
                        <h2 className="text-xl font-bold">{lecture.name} - Written Questions:</h2>
                    </div>
                    {lecture.written.map((wq, index) => (
                        <Question key={`written-${index}`} questionData={wq} type="written" lectureId={lecture.id} index={index} />
                    ))}
                </>
            )}
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [theme, setTheme] = React.useState('light');
    const [activeLectureId, setActiveLectureId] = React.useState(lecturesData[0]?.id);
    
    const tabsWrapperRef = React.useRef(null);
    const tabsContainerRef = React.useRef(null);

    // --- Dynamic Font & Icon Loading ---
    React.useEffect(() => {
        const fontLinks = [
            { id: 'font-awesome', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css' },
            { id: 'google-fonts-preconnect-1', href: 'https://fonts.googleapis.com', rel: 'preconnect' },
            { id: 'google-fonts-preconnect-2', href: 'https://fonts.gstatic.com', rel: 'preconnect', crossOrigin: 'anonymous' },
            { id: 'google-fonts-main', href: 'https://fonts.googleapis.com/css2?family=Coiny&family=Calistoga&display=swap' }
        ];

        fontLinks.forEach(linkInfo => {
            if (!document.getElementById(linkInfo.id)) {
                const link = document.createElement('link');
                link.id = linkInfo.id;
                link.rel = linkInfo.rel || 'stylesheet';
                link.href = linkInfo.href;
                if (linkInfo.crossOrigin) {
                    link.crossOrigin = linkInfo.crossOrigin;
                }
                document.head.appendChild(link);
            }
        });

        // Cleanup function to remove links when the component unmounts
        return () => {
            fontLinks.forEach(linkInfo => {
                const linkElement = document.getElementById(linkInfo.id);
                if (linkElement) {
                    document.head.removeChild(linkElement);
                }
            });
        };
    }, []); // Empty dependency array ensures this runs only once on mount


    const toggleTheme = React.useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, []);

    React.useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    React.useEffect(() => {
        const tabsContainer = tabsContainerRef.current;
        const tabsWrapper = tabsWrapperRef.current;
        if (!tabsContainer || !tabsWrapper) return;

        const checkTabOverflow = () => {
            requestAnimationFrame(() => {
                const { scrollLeft, scrollWidth, clientWidth } = tabsContainer;
                const tolerance = 2;
                tabsWrapper.classList.toggle('show-fade-left', scrollLeft > tolerance);
                tabsWrapper.classList.toggle('show-fade-right', scrollWidth - scrollLeft - clientWidth > tolerance);
            });
        };

        checkTabOverflow();
        tabsContainer.addEventListener('scroll', checkTabOverflow, { passive: true });
        window.addEventListener('resize', checkTabOverflow);
        const resizeObserver = new ResizeObserver(checkTabOverflow);
        resizeObserver.observe(tabsContainer);
        
        return () => {
            tabsContainer.removeEventListener('scroll', checkTabOverflow);
            window.removeEventListener('resize', checkTabOverflow);
            resizeObserver.disconnect();
        };
    }, []);
    
    const switchTab = (lectureId) => {
        setActiveLectureId(lectureId);
        const targetButton = tabsContainerRef.current?.querySelector(`button[data-lecture-id="${lectureId}"]`);
        targetButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    const activeLecture = lecturesData.find(lec => lec.id === activeLectureId);

    return (
        <>
            <GlobalStyles />
            <div className="page-container">
                <div className="header">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/9027/9027706.png"
                        alt="GIT Icon"
                        className="header-img"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/e0e0e0/333333?text=Icon'; }}
                    />
                    <h1>GIT</h1>
                    <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                </div>

                <div id="lecture-tabs-wrapper" ref={tabsWrapperRef}>
                    <div id="lecture-tabs" ref={tabsContainerRef} role="tablist" aria-label="Lectures">
                        {lecturesData.map(lecture => (
                            <button
                                key={lecture.id}
                                type="button"
                                className={`lecture-tab-btn ${activeLectureId === lecture.id ? 'active' : ''}`}
                                onClick={() => switchTab(lecture.id)}
                                data-lecture-id={lecture.id}
                                role="tab"
                                aria-selected={activeLectureId === lecture.id}
                            >
                                {lecture.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div id="questions-container">
                    <div id="dynamic-question-area">
                        {activeLecture ? (
                            <LectureContent key={activeLecture.id} lecture={activeLecture} />
                        ) : (
                            <p className="p-4 text-center">No lectures available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
