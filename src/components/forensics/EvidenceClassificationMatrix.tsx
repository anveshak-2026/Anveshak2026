import React from 'react';
import { INITIAL_CLASSIFICATIONS } from '../../data/mockForensicData';
import { Scale, CheckCircle2, AlertTriangle, HelpCircle, Eye, FileQuestion, Sparkles } from 'lucide-react';
import { useForensicStore } from '../../services/ForensicContext';

export const EvidenceClassificationMatrix: React.FC = () => {
  const { language } = useForensicStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'CONFIRMED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'SUPPORTED':
        return <Eye className="w-4 h-4 text-blue-600" />;
      case 'CONFLICTED':
        return <Scale className="w-4 h-4 text-amber-600" />;
      case 'MISSING':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'UNKNOWN':
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
      case 'INFERENCE':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      default:
        return <FileQuestion className="w-4 h-4 text-slate-500" />;
    }
  };

  const getLocalizedData = (c: typeof INITIAL_CLASSIFICATIONS[0]) => {
    if (language !== 'hi') {
      return {
        type: c.type,
        label: c.label,
        principle: c.principle,
        example: c.example,
      };
    }

    switch (c.type) {
      case 'CONFIRMED':
        return {
          type: 'प्रमाणित (CONFIRMED)',
          label: 'प्रत्यक्ष रूप से सत्यापित साक्ष्य',
          principle: 'प्रत्यक्ष रूप से सत्यापित वीडियो फ़्रेम जिसमें कोई अस्पष्टता या अंतर्विरोध नहीं है।',
          example: 'CAM 01 ने 18:04:12 पर व्यक्ति जैसी आकृति का प्रवेश रिकॉर्ड किया.',
        };
      case 'SUPPORTED':
        return {
          type: 'समर्थित (SUPPORTED)',
          label: 'समानांतर कैमरों द्वारा संपुष्ट',
          principle: 'द्वितीयक कैमरे या संबद्ध सेंसर द्वारा आंशिक रूप से समर्थित साक्ष्य।',
          example: 'CAM 03 ने 18:04:40 पर संबंधित गलियारे में हलचल दर्ज की.',
        };
      case 'CONFLICTED':
        return {
          type: 'विरोधाभासी (CONFLICTED)',
          label: 'असंगत या परस्पर विरोधी रिकॉर्डिंग',
          principle: 'दो या दो से अधिक कैमरों के बीच समय या विवरण में प्रत्यक्ष अंतर्विरोध।',
          example: 'CAM 01 और CAM 02 के आंतरिक समय में 137 सेकंड का अंतर पाया गया.',
        };
      case 'MISSING':
        return {
          type: 'अनुपलब्ध (MISSING)',
          label: 'अप्रत्याशित साक्ष्य अंतराल',
          principle: 'आवश्यक समय अवधि में रिकॉर्डिंग का अनपेक्षित अभाव या अंतराल।',
          example: 'CAM 02 पर 17:35 से 17:52 तक फुटेज उपलब्ध नहीं है (17 मिनट).',
        };
      case 'UNKNOWN':
        return {
          type: 'अज्ञात (UNKNOWN)',
          label: 'अपर्याप्त डेटा या असत्यापित',
          principle: 'डेटा अपर्याप्त या अस्पष्ट होने के कारण निष्कर्ष निकालना संभव नहीं।',
          example: 'खराब रोशनी या कम रिज़ॉल्यूशन के कारण वस्तु की पहचान अनिर्धारित.',
        };
      case 'INFERENCE':
        return {
          type: 'अनुमान (INFERENCE)',
          label: 'विश्लेषणात्मक निष्कर्ष',
          principle: 'प्रासंगिक साक्ष्यों के आधार पर तार्किक अनुमान, जिसे प्रत्यक्ष साक्ष्य नहीं माना जा सकता।',
          example: 'CAM 01 और CAM 03 के समय के आधार पर गलियारे में 28 सेकंड का पारगमन समय अनुमानित.',
        };
      default:
        return c;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-900">
              {language === 'hi' ? 'फोरेंसिक साक्ष्य वर्गीकरण प्रणाली' : 'Forensic Evidence Classification System'}
            </span>
            <span className="text-[10px] font-mono font-bold bg-slate-900 text-teal-300 px-2 py-0.5 rounded">
              {language === 'hi' ? 'मानक' : 'Standard'}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {language === 'hi' ? 'मूल साक्ष्य सिद्धांत:' : 'Core Evidentiary Principle:'}{' '}
            <span className="text-slate-900 font-bold bg-teal-50 px-1 py-0.5 rounded border border-teal-200">
              {language === 'hi' ? 'साक्ष्य ≠ अनुमान ≠ अज्ञात' : 'Evidence ≠ Inference ≠ Unknown'}
            </span>
          </p>
        </div>
        <p className="text-[11px] text-slate-500 max-w-sm">
          {language === 'hi'
            ? 'न्यायिक प्रक्रिया में विश्लेषणात्मक अनुमानों को प्रत्यक्ष कैमरा साक्ष्य के साथ मिश्रित होने से रोकता है।'
            : 'Guarantees analytical projections are never conflated with verified physical camera data in court proceedings.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {INITIAL_CLASSIFICATIONS.map((c) => {
          const item = getLocalizedData(c);
          return (
            <div
              key={c.type}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    {getIcon(c.type)}
                    <span>{item.type}</span>
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                    {item.label}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-snug">{item.principle}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/80 bg-white p-2 rounded text-[11px]">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                  {language === 'hi' ? 'मानक केस उदाहरण:' : 'Standard Case Example:'}
                </span>
                <p className="text-slate-800 italic font-mono text-[10.5px]">“{item.example}”</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
