import { useState, useMemo } from "react";

const recipes = [
  { id:1, emoji:"🍝", title:"Spaghetti Carbonara", time:"25 min", difficulty:"Medium", tags:[], ingredients:["spaghetti","eggs","pancetta","parmesan","black pepper","garlic"], instructions:"Cook pasta al dente. Fry pancetta until crispy. Whisk eggs with parmesan. Toss hot pasta with pancetta, remove from heat, add egg mixture, toss quickly. Season with black pepper." },
  { id:2, emoji:"🥗", title:"Greek Salad", time:"10 min", difficulty:"Easy", tags:["vegetarian","vegan","gluten-free","dairy-free"], ingredients:["cucumber","tomatoes","olives","red onion","bell pepper","olive oil","oregano"], instructions:"Chop all vegetables into chunks. Combine in bowl. Drizzle olive oil, sprinkle oregano and salt. Toss gently and serve fresh." },
  { id:3, emoji:"🍛", title:"Chickpea Curry", time:"35 min", difficulty:"Easy", tags:["vegetarian","vegan","gluten-free","dairy-free"], ingredients:["chickpeas","tomatoes","onion","garlic","ginger","cumin","turmeric","coconut milk","spinach"], instructions:"Sauté onion, garlic, ginger. Add spices, cook 1 min. Add tomatoes and chickpeas, simmer 15 min. Stir in coconut milk and spinach. Serve with rice." },
  { id:4, emoji:"🥞", title:"Fluffy Pancakes", time:"20 min", difficulty:"Easy", tags:["vegetarian"], ingredients:["flour","eggs","milk","butter","baking powder","sugar","salt","vanilla"], instructions:"Mix dry ingredients. Whisk wet ingredients separately. Combine until just mixed (lumps ok). Cook on buttered griddle over medium heat until bubbles form, flip once." },
  { id:5, emoji:"🍜", title:"Miso Ramen", time:"45 min", difficulty:"Medium", tags:["dairy-free"], ingredients:["ramen noodles","miso paste","soy sauce","soft-boiled egg","nori","green onion","sesame oil","mushrooms","corn"], instructions:"Simmer mushrooms in broth 20 min. Whisk in miso paste. Cook noodles separately. Assemble bowl with noodles, broth, and toppings. Drizzle sesame oil." },
  { id:6, emoji:"🥑", title:"Avocado Toast", time:"10 min", difficulty:"Easy", tags:["vegetarian","vegan","dairy-free"], ingredients:["sourdough bread","avocado","lemon","chili flakes","salt","olive oil","cherry tomatoes"], instructions:"Toast bread until golden. Mash avocado with lemon juice and salt. Spread on toast. Top with cherry tomatoes, chili flakes, and olive oil drizzle." },
  { id:7, emoji:"🍗", title:"Lemon Herb Chicken", time:"40 min", difficulty:"Medium", tags:["gluten-free","dairy-free"], ingredients:["chicken breast","lemon","garlic","rosemary","thyme","olive oil","salt","pepper"], instructions:"Marinate chicken in lemon juice, garlic, herbs, oil for 30 min. Sear in oven-safe pan 3 min each side. Bake at 400°F for 20 min until cooked through." },
  { id:8, emoji:"🌮", title:"Black Bean Tacos", time:"20 min", difficulty:"Easy", tags:["vegetarian","vegan","dairy-free"], ingredients:["black beans","corn tortillas","avocado","red cabbage","lime","cilantro","cumin","smoked paprika"], instructions:"Season beans with cumin and paprika, heat through. Warm tortillas. Layer beans, sliced avocado, shredded cabbage, cilantro. Finish with lime squeeze." },
  { id:9, emoji:"🍲", title:"Lentil Soup", time:"50 min", difficulty:"Easy", tags:["vegetarian","vegan","gluten-free","dairy-free"], ingredients:["red lentils","carrots","celery","onion","garlic","cumin","coriander","tomatoes","vegetable broth"], instructions:"Sauté onion, carrots, celery until soft. Add garlic and spices. Stir in lentils and broth. Simmer 30 min. Blend partially for creamy texture. Season to taste." },
  { id:10, emoji:"🍕", title:"Margherita Pizza", time:"30 min", difficulty:"Medium", tags:["vegetarian"], ingredients:["pizza dough","tomato sauce","mozzarella","basil","olive oil","garlic","salt"], instructions:"Preheat oven to 475°F with pizza stone. Stretch dough, spread sauce, add torn mozzarella. Bake 10-12 min until crust is golden. Top with fresh basil and olive oil." },
  { id:11, emoji:"🥘", title:"Shakshuka", time:"30 min", difficulty:"Easy", tags:["vegetarian","gluten-free","dairy-free"], ingredients:["eggs","tomatoes","bell pepper","onion","garlic","cumin","paprika","chili flakes","parsley"], instructions:"Sauté onion and pepper. Add garlic and spices. Stir in crushed tomatoes, simmer 10 min. Make wells in sauce, crack eggs in. Cover and cook until whites set." },
  { id:12, emoji:"🍣", title:"Salmon Teriyaki", time:"25 min", difficulty:"Easy", tags:["gluten-free","dairy-free"], ingredients:["salmon fillet","soy sauce","mirin","sake","sugar","garlic","ginger","sesame seeds","green onion"], instructions:"Mix soy sauce, mirin, sake, sugar for teriyaki sauce. Marinate salmon 15 min. Pan-fry skin-side down 4 min, flip, add sauce, cook until glazed." },
  { id:13, emoji:"🫕", title:"Vegetable Stir Fry", time:"20 min", difficulty:"Easy", tags:["vegetarian","vegan","dairy-free"], ingredients:["broccoli","snap peas","carrots","bell pepper","tofu","soy sauce","sesame oil","garlic","ginger","rice"], instructions:"Press and cube tofu, pan-fry until golden. Stir-fry vegetables over high heat 5 min. Add garlic, ginger. Pour in sauce, toss with tofu. Serve over rice." },
  { id:14, emoji:"🍮", title:"Classic Crème Brûlée", time:"60 min", difficulty:"Hard", tags:["vegetarian","gluten-free"], ingredients:["heavy cream","egg yolks","sugar","vanilla bean","salt"], instructions:"Heat cream with vanilla. Whisk yolks with sugar. Temper cream into yolks. Pour into ramekins. Bake in water bath at 325°F 40 min. Chill, then torch sugar topping." },
  { id:15, emoji:"🥙", title:"Falafel Wrap", time:"35 min", difficulty:"Medium", tags:["vegetarian","vegan","dairy-free"], ingredients:["chickpeas","onion","garlic","parsley","cumin","coriander","flour","flatbread","tahini","cucumber","tomato"], instructions:"Blend chickpeas, herbs, spices. Form patties, pan-fry 3 min each side. Warm flatbread, spread tahini, layer falafel with cucumber, tomato, pickles." },
  { id:16, emoji:"🍝", title:"Pesto Pasta", time:"20 min", difficulty:"Easy", tags:["vegetarian"], ingredients:["pasta","basil","pine nuts","parmesan","garlic","olive oil","lemon","salt","pepper"], instructions:"Blend basil, pine nuts, parmesan, garlic with olive oil until smooth. Cook pasta al dente, reserve cup of pasta water. Toss pasta with pesto, thin with pasta water." },
  { id:17, emoji:"🥣", title:"Overnight Oats", time:"5 min", difficulty:"Easy", tags:["vegetarian","vegan","gluten-free","dairy-free"], ingredients:["rolled oats","almond milk","chia seeds","banana","maple syrup","blueberries","cinnamon"], instructions:"Combine oats, almond milk, chia seeds, maple syrup in jar. Stir well, seal. Refrigerate overnight. Top with sliced banana, blueberries, and cinnamon before serving." },
  { id:18, emoji:"🍖", title:"Beef Stew", time:"120 min", difficulty:"Hard", tags:["gluten-free","dairy-free"], ingredients:["beef chuck","potatoes","carrots","onion","celery","garlic","beef broth","tomato paste","thyme","bay leaf"], instructions:"Brown beef in batches. Sauté vegetables. Add tomato paste, broth, herbs. Return beef. Simmer covered 90 min until tender. Add potatoes last 30 min." },
  { id:19, emoji:"🧆", title:"Roasted Cauliflower Bowl", time:"40 min", difficulty:"Easy", tags:["vegetarian","vegan","gluten-free","dairy-free"], ingredients:["cauliflower","chickpeas","quinoa","spinach","tahini","lemon","garlic","paprika","olive oil"], instructions:"Roast cauliflower and chickpeas at 425°F with paprika and oil for 25 min. Cook quinoa. Make tahini dressing with lemon and garlic. Assemble bowls." },
  { id:20, emoji:"🍩", title:"Banana Oat Muffins", time:"30 min", difficulty:"Easy", tags:["vegetarian","gluten-free","dairy-free"], ingredients:["ripe bananas","rolled oats","eggs","honey","coconut oil","baking powder","cinnamon","vanilla","blueberries"], instructions:"Mash bananas. Blend oats into flour. Mix all wet ingredients, combine with oat flour, baking powder, cinnamon. Fold in blueberries. Bake 350°F 20 min." },
];

const FILTERS = ["Vegetarian","Vegan","Gluten-Free","Dairy-Free"];
const tagMap = { "Vegetarian":"vegetarian","Vegan":"vegan","Gluten-Free":"gluten-free","Dairy-Free":"dairy-free" };
const diffColor = { Easy:"bg-green-100 text-green-700", Medium:"bg-amber-100 text-amber-700", Hard:"bg-red-100 text-red-700" };

function Modal({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.55)"}} onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-6xl">{recipe.emoji}</div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">×</button>
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">{recipe.title}</h2>
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">⏱ {recipe.time}</span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${diffColor[recipe.difficulty]}`}>{recipe.difficulty}</span>
            {recipe.tags.map(t=>(
              <span key={t} className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">{t}</span>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-stone-700 mb-2">🛒 Ingredients</h3>
            <ul className="grid grid-cols-2 gap-1">
              {recipe.ingredients.map(ing=>(
                <li key={ing} className="text-sm text-stone-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block flex-shrink-0"></span>{ing}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-stone-700 mb-2">📋 Instructions</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-stone-100 overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 h-28 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-200">
        {recipe.emoji}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-stone-800 text-base mb-2 line-clamp-1">{recipe.title}</h3>
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="text-xs bg-orange-100 text-orange-600 font-medium px-2 py-0.5 rounded-full">⏱ {recipe.time}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diffColor[recipe.difficulty]}`}>{recipe.difficulty}</span>
        </div>
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0,2).map(t=>(
              <span key={t} className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full capitalize">{t}</span>
            ))}
            {recipe.tags.length > 2 && <span className="text-xs text-stone-400">+{recipe.tags.length-2}</span>}
          </div>
        )}
        <div className="text-xs text-stone-500 line-clamp-2">
          <span className="font-medium text-stone-600">Ingredients: </span>
          {recipe.ingredients.slice(0,4).join(", ")}{recipe.ingredients.length>4 ? ` +${recipe.ingredients.length-4} more`:""}
        </div>
      </div>
      <div className="px-4 pb-4">
        <span className="text-xs font-semibold text-orange-500 group-hover:text-orange-600 transition-colors">View Recipe →</span>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [visible, setVisible] = useState(8);
  const [selected, setSelected] = useState(null);

  const toggleFilter = f => {
    setActiveFilters(prev => prev.includes(f) ? prev.filter(x=>x!==f) : [...prev,f]);
    setVisible(8);
  };

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(",").map(s=>s.trim()).filter(Boolean);
    return recipes.filter(r => {
      const matchesIngredients = terms.length === 0 || terms.some(t =>
        r.ingredients.some(ing => ing.toLowerCase().includes(t)) ||
        r.title.toLowerCase().includes(t)
      );
      const matchesFilters = activeFilters.length === 0 || activeFilters.every(f => r.tags.includes(tagMap[f]));
      return matchesIngredients && matchesFilters;
    });
  }, [query, activeFilters]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen" style={{background:"linear-gradient(135deg,#fff8f0 0%,#fef3e2 50%,#f0fdf4 100%)"}}>
      {selected && <Modal recipe={selected} onClose={()=>setSelected(null)} />}

      {/* Header */}
      <div className="text-center py-10 px-4">
        <div className="text-5xl mb-3">🍴</div>
        <h1 className="text-4xl font-extrabold text-stone-800 mb-2">Recipe Finder</h1>
        <p className="text-stone-500 text-base">Enter ingredients you have and discover what you can cook</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto px-4 mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-lg">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e=>{setQuery(e.target.value);setVisible(8);}}
            placeholder="e.g. chicken, garlic, tomatoes..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-stone-200 shadow-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-base transition-all"
          />
          {query && (
            <button onClick={()=>{setQuery("");setVisible(8);}} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xl font-bold transition-colors">×</button>
          )}
        </div>
        <p className="text-xs text-stone-400 mt-2 text-center">Separate multiple ingredients with commas</p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 flex-wrap px-4 mb-8">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={()=>toggleFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${
              activeFilters.includes(f)
                ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-600"
            }`}
          >
            {f}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button onClick={()=>setActiveFilters([])} className="px-4 py-1.5 rounded-full text-sm font-medium text-red-400 hover:text-red-600 border border-red-200 bg-white transition-colors">
            Clear ×
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-4 mb-4">
        <p className="text-sm text-stone-500">
          {filtered.length === 0 ? "No recipes found" : `Showing ${shown.length} of ${filtered.length} recipe${filtered.length!==1?"s":""}`}
          {query && <span className="text-orange-500 font-medium"> for "{query}"</span>}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-5xl mb-4">🥺</div>
            <p className="text-lg font-medium">No recipes found</p>
            <p className="text-sm mt-1">Try different ingredients or remove some filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4" style={{gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))"}}>
            {shown.map(r => <RecipeCard key={r.id} recipe={r} onClick={()=>setSelected(r)} />)}
          </div>
        )}
      </div>

      {/* Show more */}
      {visible < filtered.length && (
        <div className="text-center py-8">
          <button
            onClick={()=>setVisible(v=>v+8)}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Show More Recipes ↓
          </button>
          <p className="text-xs text-stone-400 mt-2">{filtered.length - visible} more available</p>
        </div>
      )}

      <div className="text-center py-8 text-stone-400 text-xs">Made with 🧡 · {recipes.length} recipes available</div>
    </div>
  );
}