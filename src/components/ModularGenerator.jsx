import React, { useState, useRef } from 'react';

const AIRTABLE_BASE_ID = 'appCatoxz4qIqiY6F';
const AIRTABLE_TABLE_NAME = 'Exercices';
const AIRTABLE_TOKEN = 'pat1UfGk7GFtte5eK.5813713a385f0da49ddb462c197767bb25f980cda9e8e1e804d6f562caed7637';

const DIFFICULTY_ORDER = { 'débutant': 1, 'intermédiaire': 2, 'avancé': 3 };

// ===== UTILS =====
const normalize = (str) =>
  str == null
    ? ''
    : String(str)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^\w\s-]/g, '')
        .trim();

const parseTags = (val) => !val
  ? []
  : Array.isArray(val)
    ? val.filter(Boolean).map(normalize)
    : typeof val === 'string'
      ? val.split(/[,;]/).map((tag) => normalize(tag.trim())).filter(Boolean)
      : [normalize(val)].filter(Boolean);

const parseSportField = (sportValue) => !sportValue
  ? []
  : Array.isArray(sportValue)
    ? sportValue.filter(Boolean).map(normalize)
    : typeof sportValue === 'string' && sportValue.trim() !== ''
      ? sportValue.split(/[,;|]/).map(normalize).filter(Boolean)
      : [];

const getExerciseTitle = (exercise) => {
  // Cherche dans les champs standards
  const candidates = [
    "Nom de l'exercice", "Nom", "name", "titre", "Titre", "Exercise", "Exercice", "Name"
  ];
  
  for (const field of candidates) {
    const value = exercise[field];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (Array.isArray(value) && value[0] && typeof value[0] === 'string' && value[0].trim()) {
      return value[0].trim();
    }
  }
  
  // Recherche dans les clés contenant "nom" ou "exerc"
  for (const k of Object.keys(exercise)) {
    if (typeof exercise[k] === 'string' && k.toLowerCase().includes('nom') && exercise[k].trim()) {
      return exercise[k].trim();
    }
    if (typeof exercise[k] === 'string' && k.toLowerCase().includes('exerc') && exercise[k].trim()) {
      return exercise[k].trim();
    }
  }
  
  // Fallback: première valeur textuelle valide
  for (const v of Object.values(exercise)) {
    if (typeof v === 'string' && v.trim().length > 4) return v.trim();
    if (Array.isArray(v) && typeof v[0] === 'string' && v[0].trim().length > 4) return v[0].trim();
  }
  
  return 'Exercice sans nom';
};

const calculateRelevanceScore = (exercise, filters) => {
  let score = 0, maxScore = 0;
  
  // Objectifs (40% du score)
  maxScore += 4;
  if (filters.objectif.length > 0) {
    const exerciseTypes = parseTags(exercise.Type);
    const matches = filters.objectif.filter(obj =>
      exerciseTypes.some(type => type.includes(obj) || obj.includes(type))
    );
    score += (matches.length / filters.objectif.length) * 4;
  } else score += 4;
  
  // Sport (30% du score)
  maxScore += 3;
  if (filters.sport && filters.sport !== 'aucun') {
    const exerciseSports = parseSportField(exercise.Sport);
    const sportMatch = exerciseSports.some(sport =>
      sport.includes(filters.sport) || filters.sport.includes(sport)
    );
    if (sportMatch) score += 3;
  } else score += 3;
  
  // Niveau (20% du score)
  maxScore += 2;
  if (filters.niveau) {
    const exerciseLevel = normalize(exercise.Niveau);
    if (exerciseLevel === filters.niveau || exerciseLevel.includes(filters.niveau)) {
      score += 2;
    }
  } else score += 2;
  
  // Autres critères (10% du score)
  const otherCriteria = [
    { filter: filters.lieu, field: exercise.Lieu },
    { filter: filters.materiel, field: exercise['Matériel'] },
    { filter: filters.douleur, field: exercise['Douleur ciblée'] },
    { filter: filters.frequence, field: exercise['Fréquence'] }
  ];
  
  otherCriteria.forEach(({ filter, field }) => {
    maxScore += 0.25;
    if (Array.isArray(filter) && filter.length > 0 && !filter.includes('aucune')) {
      const fieldTags = parseTags(field);
      const hasMatch = filter.some(f =>
        fieldTags.some(tag => tag.includes(f) || f.includes(tag))
      );
      if (hasMatch) score += 0.25;
    } else if (typeof filter === 'string' && filter && filter !== 'aucun') {
      const fieldValue = normalize(field);
      if (fieldValue.includes(filter) || filter.includes(fieldValue)) {
        score += 0.25;
      }
    } else score += 0.25;
  });
  
  return Math.round((score / maxScore) * 100);
};

const sortExercises = (exercises) =>
  [...exercises].sort((a, b) => {
    const scoreDiff = (b.score || 0) - (a.score || 0);
    if (scoreDiff !== 0) return scoreDiff;
    const aLevel = normalize(a.Niveau || '');
    const bLevel = normalize(b.Niveau || '');
    const aOrder = DIFFICULTY_ORDER[aLevel] || 999;
    const bOrder = DIFFICULTY_ORDER[bLevel] || 999;
    return aOrder - bOrder;
  });

// ===== COMPOSANTS =====
const FilterButton = ({ option, isSelected, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: '9px 18px',
      margin: '4px 6px 4px 0',
      borderRadius: '22px',
      border: '1.5px solid',
      borderColor: isSelected ? '#1674ea' : '#e2e6f0',
      background: isSelected ? 'linear-gradient(90deg, #1674ea 0%, #0046ad 100%)' : '#fff',
      color: isSelected ? '#fff' : '#174080',
      fontWeight: 500,
      fontSize: '15px',
      transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
      boxShadow: isSelected ? '0 1px 5px #1674ea22' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
    }}
    onMouseEnter={e => {
      if (!disabled && !isSelected) {
        e.currentTarget.style.borderColor = '#1674ea';
        e.currentTarget.style.background = '#f8faff';
      }
    }}
    onMouseLeave={e => {
      if (!disabled && !isSelected) {
        e.currentTarget.style.borderColor = '#e2e6f0';
        e.currentTarget.style.background = '#fff';
      }
    }}
  >
    {option}
  </button>
);

const ExerciseCard = ({ exercise }) => (
  <div style={{
    border: '1px solid #eaeaea',
    borderRadius: '20px',
    background: '#fff',
    margin: '12px 0',
    padding: '24px 26px',
    boxShadow: '0 3px 18px #2451c91c',
    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = '0 8px 28px #2451c92e';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = '0 3px 18px #2451c91c';
    e.currentTarget.style.transform = 'translateY(0)';
  }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <h4 style={{ 
        margin: 0, 
        fontWeight: 700, 
        fontSize: 20, 
        flex: 1, 
        color: '#174080',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
      }}>
        {getExerciseTitle(exercise)}
      </h4>
      {typeof exercise.score === 'number' && (
        <span style={{
          background: exercise.score >= 80 ? '#dcfbe4' : exercise.score >= 60 ? '#fff7d1' : '#ffe2e2',
          color: exercise.score >= 80 ? '#088451' : exercise.score >= 60 ? '#b49b1b' : '#c2352b',
          fontWeight: 700,
          fontSize: 13,
          borderRadius: 14,
          padding: '5px 12px',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        }}>
          {exercise.score}%
        </span>
      )}
    </div>
    
    {exercise.Variant && (
      <div style={{ 
        fontStyle: 'italic', 
        color: '#425670', 
        fontSize: 15, 
        marginBottom: 8,
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
      }}>
        {exercise.Variant}
      </div>
    )}
    
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '8px 0 16px 0' }}>
      {[...(Array.isArray(exercise.Type) ? exercise.Type : [exercise.Type])]
        .filter(Boolean)
        .map((type, i) => (
          <span key={i} style={{
            background: 'linear-gradient(90deg,#1674ea12 0%,#0046ad07 100%)',
            color: '#1674ea',
            borderRadius: 12,
            fontSize: 13,
            padding: '4px 10px',
            fontWeight: 500,
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
          }}>
            {type}
          </span>
        ))}
      {exercise.Niveau && (
        <span style={{
          background: '#ede9ff',
          color: '#6c40ad',
          borderRadius: 12,
          fontSize: 13,
          padding: '4px 10px',
          fontWeight: 500,
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        }}>
          {exercise.Niveau}
        </span>
      )}
      {(Array.isArray(exercise.Sport) ? exercise.Sport : [])
        .filter(Boolean)
        .map((sport, i) => (
          <span key={i} style={{
            background: '#fff4e1',
            color: '#b97126',
            borderRadius: 12,
            fontSize: 13,
            padding: '4px 10px',
            fontWeight: 500,
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
          }}>
            {sport}
          </span>
        ))}
    </div>
    
    {exercise.Description && (
      <div style={{
        color: '#425670',
        fontSize: 15,
        lineHeight: 1.45,
        marginBottom: 16,
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
      }}>
        {exercise.Description}
      </div>
    )}
    
    {exercise.Lien && (
      <a
        href={exercise.Lien}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'linear-gradient(90deg,#1674ea 0%,#0046ad 100%)',
          color: '#fff',
          borderRadius: 12,
          padding: '10px 24px',
          textDecoration: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 10px #1674ea33',
          fontSize: 15,
          transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 6px 18px #1674ea55';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 10px #1674ea33';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Voir la vidéo
      </a>
    )}
  </div>
);

// ===== COMPOSANT PRINCIPAL =====
function ModularGenerator() {
  const filterSections = [
    { name: 'sport', label: '🏃 Sport', options: ['Football', 'Basketball', 'Golf', 'Moto cross', 'Sport automobile', 'Course à pied', 'Padel/Tennis', 'Aucun'], multi: false },
    { name: 'objectif', label: '🎯 Objectif', options: ['Mobilité', 'Activation', 'Renforcement', 'Gainage', 'Proprioception', 'Étirement', 'Récupération', 'Technique', 'Endurance', 'Explosivité', 'Vitesse', 'Agilité', 'Plyométrie', 'Échauffement'], multi: true },
    { name: 'niveau', label: '📊 Niveau', options: ['Débutant', 'Intermédiaire', 'Avancé'], multi: false },
    { name: 'frequence', label: '📅 Fréquence', options: ['1x/semaine', '2-3x/semaine', '3-5x/semaine', 'Quotidienne'], multi: false },
    { name: 'douleur', label: '🩹 Douleur ciblée', options: ['Aucune', 'Cheville', 'Genou', "Tendon d'Achille", 'Fascia Plantaire', 'Hanches', 'Quadriceps', 'Ischio-Jambiers', 'Fessiers', 'Adducteurs', 'Psoas', 'Épaules', 'Coiffe des Rotateurs', 'Tronc', 'Mollets', 'Lombaires', 'Abdominaux', 'Dos', 'Pectoraux', 'Tibias', 'Obliques', 'Triceps', 'Biceps', 'Poignets', 'Avant-Bras'], multi: true },
    { name: 'lieu', label: '📍 Lieu', options: ['Terrain', 'Domicile', 'Intérieur', 'Extérieur', 'Bureau', 'Partout', 'Salle de sport'], multi: true },
    { name: 'materiel', label: '🛠️ Matériel', options: ['Aucun', 'Tapis de sol', 'Step', 'Box pliométrique', 'Plots + Échelle', 'Ballon', 'Machines de renforcement', 'Medicine Ball', 'Bâton', 'Rouleau de massage', 'Élastiques', "Sangle d'étirement", 'Banc de musculation', 'Swiss Ball', 'Haltères', 'BOSU', 'Balance Board', 'Bain froid', "Appareil d'électrostimulation"], multi: true }
  ];

  const [form, setForm] = useState(
    filterSections.reduce((a, s) => ({ ...a, [s.name]: s.multi ? [] : '' }), {})
  );
  
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [limit, setLimit] = useState(20);
  const resultsRef = useRef(null);

  const toggleSelection = (name, value, isMulti = false) => {
    setForm(prev => ({
      ...prev,
      [name]: isMulti
        ? prev[name].includes(value)
          ? prev[name].filter(v => v !== value)
          : [...prev[name], value]
        : prev[name] === value ? '' : value
    }));
  };

  const generateProgram = async () => {
    setLoading(true);
    setError(null);
    setSearched(true);
    setLimit(20);
    
    try {
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?maxRecords=300`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
      });
      
      if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

      const data = await response.json();
      const allRecords = data.records.map(r => r.fields);
      
      const filters = {
        objectif: (form.objectif || []).map(normalize),
        lieu: (form.lieu || []).map(normalize),
        materiel: (form.materiel || []).map(normalize),
        douleur: (form.douleur || []).map(normalize),
        sport: normalize(form.sport),
        niveau: normalize(form.niveau),
        frequence: normalize(form.frequence)
      };

      const scoredExercises = allRecords
        .map(exercise => ({ ...exercise, score: calculateRelevanceScore(exercise, filters) }))
        .filter(exercise => exercise.score >= 20);
        
      scoredExercises.forEach(exercise => { 
        exercise.Sport = parseSportField(exercise.Sport) 
      });
      
      setExercises(sortExercises(scoredExercises));
      
      setTimeout(() => { 
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' }) 
      }, 300);
      
    } catch (err) {
      setError('Impossible de récupérer les exercices. Vérifiez votre connexion.');
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setForm(filterSections.reduce((a, s) => ({ ...a, [s.name]: s.multi ? [] : '' }), {}));
    setExercises(null);
    setError(null);
    setSearched(false);
    setLimit(20);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg,#e8f0fe 0%,#fff 100%)', 
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      padding: '0 12px'
    }}>
      {/* HEADER */}
      <header style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '44px 18px 14px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo-kinexperience.png"
            alt="Logo"
            style={{
              width: 54,
              height: 54,
              marginRight: 14,
              borderRadius: 16,
              boxShadow: '0 2px 18px #1674ea18'
            }}
          />
          <span style={{
            fontWeight: 700,
            color: '#144178',
            fontSize: 30,
            letterSpacing: '.01em'
          }}>
            KineXpérience
          </span>
        </div>
        <a
          href="/"
          style={{
            background: 'linear-gradient(90deg,#1674ea 0%,#0046ad 100%)',
            color: '#fff',
            padding: '12px 36px',
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 18,
            boxShadow: '0 2px 10px #1674ea22',
            letterSpacing: '.01em',
            textDecoration: 'none',
            transition: 'all .14s cubic-bezier(.4,0,.2,1)',
            cursor: 'pointer'
          }}
          onMouseEnter={e =>
            (e.currentTarget.style.boxShadow = '0 6px 22px #1674ea44')
          }
          onMouseLeave={e =>
            (e.currentTarget.style.boxShadow = '0 2px 10px #1674ea22')
          }
        >
          Retour accueil
        </a>
      </header>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 8px 48px 8px' }}>
        {/* HERO */}
        <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 15 }}>
            <img
              src="/logo-kinexperience.png"
              alt="Logo KineXperience"
              style={{ 
                width: 100, 
                height: 100, 
                borderRadius: 20, 
                boxShadow: '0 4px 30px #17408024' 
              }}
              draggable={false}
            />
          </div>
          <h1 style={{ 
            fontWeight: 800, 
            fontSize: 34, 
            margin: 0, 
            color: '#174080', 
            letterSpacing: '.02em',
            marginBottom: 12
          }}>
            🏋️ Générateur de Programme
          </h1>
          <div style={{ 
            color: '#2256a6', 
            fontSize: 19, 
            fontWeight: 500,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            Génère ton programme d'exercices sur-mesure validé par des experts.
          </div>
        </div>

        {/* FILTRES */}
        <div style={{
          background: '#fff',
          borderRadius: 28,
          boxShadow: '0 6px 40px #1674ea1a',
          padding: '40px 28px 30px 28px',
          marginBottom: 40,
        }}>
          {filterSections.map(section => (
            <div key={section.name} style={{ marginBottom: 18 }}>
              <div style={{
                fontWeight: 700,
                color: '#144178',
                fontSize: 17,
                marginBottom: 8,
                letterSpacing: '.01em'
              }}>
                {section.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
                {section.options.map(option => (
                  <FilterButton
                    key={option}
                    option={option}
                    isSelected={section.multi
                      ? form[section.name]?.includes(option)
                      : form[section.name] === option}
                    onClick={() => toggleSelection(section.name, option, section.multi)}
                    disabled={loading}
                  />
                ))}
              </div>
            </div>
          ))}
          
          {/* BOUTONS D'ACTION */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 15, 
            marginTop: 28, 
            borderTop: '1px solid #e2e6f0', 
            paddingTop: 28 
          }}>
            <button
              onClick={clearFilters}
              disabled={loading}
              style={{
                padding: '14px 32px',
                background: '#f5f5f5',
                color: '#174080',
                fontWeight: 600,
                border: 'none',
                borderRadius: 16,
                fontSize: 17,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.background = '#eeeeee';
              }}
              onMouseLeave={e => {
                if (!loading) e.currentTarget.style.background = '#f5f5f5';
              }}
            >
              Effacer les filtres
            </button>
            <button
              onClick={generateProgram}
              disabled={loading}
              style={{
                padding: '14px 38px',
                background: 'linear-gradient(90deg,#1674ea 0%,#0046ad 100%)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                borderRadius: 16,
                fontSize: 17,
                boxShadow: '0 2px 14px #1674ea33',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '.02em',
                transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.boxShadow = '0 6px 22px #1674ea44';
              }}
              onMouseLeave={e => {
                if (!loading) e.currentTarget.style.boxShadow = '0 2px 14px #1674ea33';
              }}
            >
              {loading ? "Génération..." : "Générer le programme"}
            </button>
          </div>
        </div>

        {/* RÉSULTATS */}
        <div ref={resultsRef}></div>
        
        {error && (
          <div style={{ 
            background: '#ffe9e9', 
            border: '1px solid #ffc0c0', 
            color: '#b43232', 
            borderRadius: 20, 
            padding: 20, 
            margin: '20px 0', 
            textAlign: 'center',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
          }}>
            ⚠️ {error}
          </div>
        )}
        
        {exercises !== null && exercises.length === 0 && !error && searched && (
          <div style={{ 
            background: '#fffbe6', 
            border: '1px solid #ffe7a1', 
            color: '#b49b1b', 
            borderRadius: 20, 
            padding: 20, 
            margin: '20px 0', 
            textAlign: 'center',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
          }}>
            🔍 Aucun exercice trouvé.<br />
            Modifie tes filtres pour obtenir plus de résultats.
          </div>
        )}
        
        {exercises && exercises.length > 0 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{
                background: 'linear-gradient(90deg,#1674ea12 0%,#0046ad07 100%)',
                color: '#1674ea',
                fontWeight: 700,
                fontSize: 18,
                borderRadius: 20,
                padding: '12px 28px',
                display: 'inline-block',
                border: '1px solid #1674ea22',
                fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
              }}>
                🎉 {exercises.slice(0, limit).length} exercice{exercises.slice(0, limit).length > 1 ? 's' : ''} trouvé{exercises.slice(0, limit).length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div>
              {exercises.slice(0, limit).map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))}
            </div>
            
            {limit < exercises.length && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <button
                  onClick={() => setLimit(limit + 20)}
                  style={{
                    padding: '14px 42px',
                    background: 'linear-gradient(90deg,#1674ea 0%,#0046ad 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: 16,
                    fontSize: 17,
                    boxShadow: '0 2px 14px #1674ea33',
                    cursor: 'pointer',
                    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
                    fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 6px 22px #1674ea44';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 2px 14px #1674ea33';
                  }}
                >
                  Voir plus d'exercices
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModularGenerator;
