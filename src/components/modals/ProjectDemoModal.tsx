import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  RefreshCw,
  CheckCircle2,
  Car,
  Activity,
  Zap,
  FileText,
  ShieldCheck,
  Flame,
  HeartPulse,
  Trophy,
  Smile,
  Clock,
  Check,
  Figma,
  ExternalLink,
  Ticket,
  Star,
  Github
} from 'lucide-react';
import { Project } from '../../types';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // -------------------------------------------------------------
  // 1. Toll System Interactive State
  // -------------------------------------------------------------
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv' | 'truck' | 'bus'>('sedan');
  const [licensePlate, setLicensePlate] = useState('TN 45 AB 8821');
  const [processingToll, setProcessingToll] = useState(false);
  const [barrierOpen, setBarrierOpen] = useState(false);
  const [tollReceipt, setTollReceipt] = useState<{
    txnId: string;
    amount: number;
    time: string;
    plate: string;
    type: string;
  } | null>(null);
  const [totalTollRevenue, setTotalTollRevenue] = useState(142.50);
  const [vehiclesProcessed, setVehiclesProcessed] = useState(28);

  // -------------------------------------------------------------
  // 2. Google Form Survey Simulation State
  // -------------------------------------------------------------
  const [formFrequency, setFormFrequency] = useState('3-4 times/week');
  const [formGoal, setFormGoal] = useState('Endurance & Stamina');
  const [formIdea, setFormIdea] = useState('Implement 15-minute campus step challenges between classes');
  const [submittingForm, setSubmittingForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [surveyResponses, setSurveyResponses] = useState([
    { id: 1, freq: 'Daily', goal: 'Weight Loss', idea: 'Hydration tracker with hourly reminders', time: '10 mins ago' },
    { id: 2, freq: '3-4 times/week', goal: 'Endurance & Stamina', idea: 'Weekend group cycling events in campus', time: '1 hour ago' },
    { id: 3, freq: 'Occasional', goal: 'Stress Relief', idea: 'Guided 10-minute yoga sessions during exam week', time: '3 hours ago' }
  ]);

  // Fitness Activity Tracker State
  const [activityType, setActivityType] = useState<'running' | 'cycling' | 'hiit'>('running');
  const [durationMins] = useState(30);
  const [streakDays, setStreakDays] = useState(12);
  const [totalCalories, setTotalCalories] = useState(480);
  const [bpm, setBpm] = useState(138);
  const [loggedActivity, setLoggedActivity] = useState<string | null>(null);

  // -------------------------------------------------------------
  // 3. Smile Steps Interactive State
  // -------------------------------------------------------------
  const [brushingTimeLeft, setBrushingTimeLeft] = useState(120);
  const [isBrushingActive, setIsBrushingActive] = useState(false);
  const [brushingQuadrant, setBrushingQuadrant] = useState('Top Left & Right Outer');
  const [smileChecklist, setSmileChecklist] = useState({
    morningBrush: true,
    floss: true,
    hydrate: true,
    nightBrush: false,
    mouthwash: false,
  });
  const [smileStreak, setSmileStreak] = useState(14);
  const [starsCollected, setStarsCollected] = useState(42);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isBrushingActive && brushingTimeLeft > 0) {
      timer = setInterval(() => {
        setBrushingTimeLeft((prev) => {
          const next = prev - 1;
          if (next > 90) setBrushingQuadrant('Top Left & Right Outer');
          else if (next > 60) setBrushingQuadrant('Bottom Left & Right Outer');
          else if (next > 30) setBrushingQuadrant('Chewing Surfaces (Top & Bottom)');
          else if (next > 0) setBrushingQuadrant('Inside Surfaces & Tongue');
          else {
            setIsBrushingActive(false);
            setStarsCollected((s) => s + 5);
            setSmileStreak((st) => st + 1);
            setSmileChecklist((chk) => ({ ...chk, nightBrush: true }));
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBrushingActive, brushingTimeLeft]);

  const toggleSmileItem = (key: keyof typeof smileChecklist) => {
    setSmileChecklist((prev) => {
      const updated = !prev[key];
      if (updated) setStarsCollected((s) => s + 1);
      return { ...prev, [key]: updated };
    });
  };

  // -------------------------------------------------------------
  // 4. Movie App UI/UX Figma Prototype State
  // -------------------------------------------------------------
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C4', 'C5']);
  const [selectedShowtime, setSelectedShowtime] = useState('07:30 PM');
  const [ticketBooked, setTicketBooked] = useState(false);

  const MOVIES_LIST = [
    {
      id: 'm1',
      title: 'Interstellar: Odyssey',
      genre: 'Sci-Fi / Adventure',
      rating: '9.2',
      price: 12.50,
      synopsis: 'A team of exploratory researchers travel through a wormhole in space in an attempt to ensure humanity survival.',
    },
    {
      id: 'm2',
      title: 'Cyberpunk 2099',
      genre: 'Action / Sci-Fi',
      rating: '8.8',
      price: 11.00,
      synopsis: 'An underground operative navigates corporate warfare in a neon-lit futuristic metropolis to uncover a rogue AI.',
    },
    {
      id: 'm3',
      title: 'The Enigma Chronicle',
      genre: 'Mystery / Thriller',
      rating: '8.6',
      price: 10.50,
      synopsis: 'A brilliant detective solves a cryptographic cipher linked to a century-old covert society in Victorian London.',
    }
  ];

  const currentMovie = MOVIES_LIST[selectedMovieIndex];
  const seatLayout = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
  ];

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBookTickets = () => {
    if (selectedSeats.length === 0) return;
    setTicketBooked(true);
    setTimeout(() => setTicketBooked(false), 3500);
  };

  // Toll handlers
  const getVehicleFare = (type: string) => {
    switch (type) {
      case 'sedan': return 2.50;
      case 'suv': return 5.00;
      case 'truck': return 12.00;
      case 'bus': return 8.00;
      default: return 2.50;
    }
  };

  const handleProcessToll = () => {
    setProcessingToll(true);
    setBarrierOpen(false);

    setTimeout(() => {
      const fare = getVehicleFare(vehicleType);
      const newTxn = {
        txnId: `TL-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: fare,
        time: new Date().toLocaleTimeString(),
        plate: licensePlate.toUpperCase(),
        type: vehicleType.toUpperCase()
      };

      setTollReceipt(newTxn);
      setTotalTollRevenue(prev => prev + fare);
      setVehiclesProcessed(prev => prev + 1);
      setBarrierOpen(true);
      setProcessingToll(false);
    }, 1000);
  };

  const handleRandomizePlate = () => {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const num1 = Math.floor(10 + Math.random() * 89);
    const num2 = Math.floor(1000 + Math.random() * 8999);
    const rndLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
    setLicensePlate(`TN ${num1} ${rndLetters} ${num2}`);
  };

  const handleSubmitGoogleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIdea.trim()) return;

    setSubmittingForm(true);

    setTimeout(() => {
      const newResponse = {
        id: Date.now(),
        freq: formFrequency,
        goal: formGoal,
        idea: formIdea,
        time: 'Just now'
      };

      setSurveyResponses([newResponse, ...surveyResponses]);
      setSubmittingForm(false);
      setFormSubmitted(true);
      setFormIdea('');
    }, 800);
  };

  const handleLogWorkout = () => {
    const burned = durationMins * (activityType === 'hiit' ? 14 : activityType === 'running' ? 11 : 8);
    setTotalCalories(prev => prev + burned);
    setStreakDays(prev => prev + 1);
    setBpm(120 + Math.floor(Math.random() * 35));
    setLoggedActivity(`Logged ${durationMins} mins of ${activityType.toUpperCase()} (+${burned} kcal burned)!`);
    setTimeout(() => setLoggedActivity(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12131a] border border-[#818cf8]/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#818cf8]/20 flex items-center justify-between bg-[#1a1b22]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1e1b4b] border border-[#818cf8]/30">
              {project.id === 'proj-4' ? (
                <Figma className="w-5 h-5 text-[#818cf8]" />
              ) : project.id === 'proj-3' ? (
                <Smile className="w-5 h-5 text-[#818cf8]" />
              ) : (
                <Zap className="w-5 h-5 text-[#818cf8]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#818cf8] text-[#101b8a] px-2 py-0.5 rounded font-code uppercase">
                  {project.badge}
                </span>
                <span className="text-xs text-[#818cf8] font-code">
                  {project.id === 'proj-4' ? 'Interactive UI/UX Prototype' : 'Live Interactive Demo'}
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-0.5">{project.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1a1b22] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* ========================================================================= */}
          {/* Project 1: Streamline Toll Crossing Systems */}
          {/* ========================================================================= */}
          {project.id === 'proj-1' && (
            <div className="space-y-6">
              <div className="bg-[#1a1b22] border border-[#818cf8]/20 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Toll Plaza Command Center</h3>
                  <p className="text-xs text-[#94a3b8]">Simulate vehicle RFID queue processing with automated receipt generation.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-[#94a3b8] block font-code">TOTAL REVENUE</span>
                    <span className="text-sm font-bold text-emerald-400 font-code">${totalTollRevenue.toFixed(2)}</span>
                  </div>
                  <div className="h-6 w-px bg-white/10"></div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#94a3b8] block font-code">VEHICLES</span>
                    <span className="text-sm font-bold text-[#818cf8] font-code">{vehiclesProcessed}</span>
                  </div>
                </div>
              </div>

              {/* Toll Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 space-y-4">
                  <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">Vehicle Selection</h4>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-[#c6c5d5] font-code">Vehicle Category:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['sedan', 'suv', 'truck', 'bus'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setVehicleType(t)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase font-code border transition-all cursor-pointer flex items-center justify-between ${
                            vehicleType === t
                              ? 'bg-[#818cf8] text-[#101b8a] border-[#818cf8]'
                              : 'bg-[#12131a] text-[#c6c5d5] border-[#818cf8]/20 hover:border-[#818cf8]/50'
                          }`}
                        >
                          <span>{t}</span>
                          <span className="text-[10px] opacity-80">${getVehicleFare(t).toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#c6c5d5] font-code">License Plate Number:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="flex-1 bg-[#12131a] border border-[#818cf8]/30 rounded-lg px-3 py-2 text-xs font-code text-white uppercase focus:outline-none focus:border-[#818cf8]"
                      />
                      <button
                        onClick={handleRandomizePlate}
                        className="p-2 rounded-lg bg-[#1e1b4b] border border-[#818cf8]/30 text-[#818cf8] hover:text-white transition-all cursor-pointer"
                        title="Randomize Plate"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleProcessToll}
                    disabled={processingToll}
                    className="w-full py-3 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {processingToll ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying FASTag & Processing...</span>
                      </>
                    ) : (
                      <>
                        <Car className="w-4 h-4" />
                        <span>Scan & Deduct Toll (${getVehicleFare(vehicleType).toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Toll Status & Receipt */}
                <div className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code mb-3">Lane Barrier Status</h4>
                    
                    <div className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                      barrierOpen
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}>
                      <div className={`w-3 h-3 rounded-full animate-ping ${barrierOpen ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
                      <span className="text-xs font-bold font-code">
                        {barrierOpen ? 'BARRIER OPEN — VEHICLE PASS APPROVED' : 'BARRIER CLOSED — AWAITING SCAN'}
                      </span>
                    </div>

                    {tollReceipt && (
                      <div className="mt-4 p-3.5 bg-[#12131a] rounded-lg border border-[#818cf8]/25 text-xs font-code space-y-1.5 animate-fadeIn">
                        <div className="flex justify-between text-[#94a3b8] border-b border-white/5 pb-1">
                          <span>RECEIPT NO:</span>
                          <span className="text-white font-bold">{tollReceipt.txnId}</span>
                        </div>
                        <div className="flex justify-between text-[#94a3b8]">
                          <span>PLATE:</span>
                          <span className="text-white">{tollReceipt.plate}</span>
                        </div>
                        <div className="flex justify-between text-[#94a3b8]">
                          <span>CLASS:</span>
                          <span className="text-white">{tollReceipt.type}</span>
                        </div>
                        <div className="flex justify-between text-[#94a3b8] pt-1 border-t border-white/5">
                          <span>FARE DEDUCTED:</span>
                          <span className="text-emerald-400 font-bold">${tollReceipt.amount.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-[#94a3b8] font-code pt-3 border-t border-white/5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Relational MySQL schema with fast transaction commit.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* Project 2: Ideas That Can Boost Fitness Activities */}
          {/* ========================================================================= */}
          {project.id === 'proj-2' && (
            <div className="space-y-6">
              <div className="bg-[#1a1b22] border border-[#818cf8]/20 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Google Form Survey Aggregator</h3>
                  <p className="text-xs text-[#94a3b8]">Interactive community feedback submission & fitness habit tracker.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#1e1b4b] border border-[#818cf8]/30 text-xs text-[#bdc2ff] font-code">
                  {surveyResponses.length} Submissions Logged
                </span>
              </div>

              {/* Form Simulator */}
              <form onSubmit={handleSubmitGoogleForm} className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#818cf8]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-code">
                      Submit Fitness Suggestion (Simulated Form)
                    </h4>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#c6c5d5] font-code">Weekly Exercise Frequency:</label>
                    <select
                      value={formFrequency}
                      onChange={(e) => setFormFrequency(e.target.value)}
                      className="w-full bg-[#12131a] border border-[#818cf8]/30 rounded-lg px-3 py-2 text-xs font-code text-white focus:outline-none focus:border-[#818cf8]"
                    >
                      <option value="Daily">Daily (6-7 days)</option>
                      <option value="3-4 times/week">3-4 times / week</option>
                      <option value="1-2 times/week">1-2 times / week</option>
                      <option value="Occasional">Occasional / Weekends</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-[#c6c5d5] font-code">Primary Health Goal:</label>
                    <select
                      value={formGoal}
                      onChange={(e) => setFormGoal(e.target.value)}
                      className="w-full bg-[#12131a] border border-[#818cf8]/30 rounded-lg px-3 py-2 text-xs font-code text-white focus:outline-none focus:border-[#818cf8]"
                    >
                      <option value="Endurance & Stamina">Endurance & Stamina</option>
                      <option value="Weight Loss & Cardio">Weight Loss & Cardio</option>
                      <option value="Stress Relief & Wellness">Stress Relief & Wellness</option>
                      <option value="Strength Building">Strength Building</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#c6c5d5] font-code">Your Innovative Idea / Suggestion:</label>
                  <input
                    type="text"
                    value={formIdea}
                    onChange={(e) => setFormIdea(e.target.value)}
                    placeholder="e.g., Campus hydration checkpoints, 10k step marathon..."
                    className="w-full bg-[#12131a] border border-[#818cf8]/30 rounded-lg px-3 py-2 text-xs font-code text-white focus:outline-none focus:border-[#818cf8]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    disabled={submittingForm || !formIdea.trim()}
                    className="px-6 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submittingForm ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{submittingForm ? 'Submitting...' : 'Submit to Survey'}</span>
                  </button>
                  {formSubmitted && (
                    <span className="text-emerald-400 text-xs font-code animate-fadeIn">
                      ✓ Response logged into Survey Sheet!
                    </span>
                  )}
                </div>
              </form>

              {/* Workout Logger Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] font-code block">AVG HEART RATE</span>
                    <span className="text-lg font-bold text-white font-code">{bpm} BPM</span>
                  </div>
                </div>

                <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] font-code block">TOTAL CALORIES</span>
                    <span className="text-lg font-bold text-white font-code">{totalCalories} KCAL</span>
                  </div>
                </div>

                <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] font-code block">DAILY STREAK</span>
                    <span className="text-lg font-bold text-[#bdc2ff] font-code">{streakDays} DAYS</span>
                  </div>
                </div>
              </div>

              {loggedActivity && (
                <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 font-code text-center animate-fadeIn">
                  {loggedActivity}
                </div>
              )}

              <div className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">Daily Workout Tracker</h4>
                  <span className="text-xs font-code text-emerald-400 font-bold">{totalCalories} kcal burned</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['running', 'cycling', 'hiit'] as const).map((act) => (
                    <button
                      key={act}
                      onClick={() => setActivityType(act)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        activityType === act
                          ? 'bg-[#1e1b4b] border-[#818cf8] text-white'
                          : 'bg-[#12131a] border-[#818cf8]/20 text-[#94a3b8]'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase font-code block text-[#bdc2ff]">{act}</span>
                      <span className="text-[11px] text-[#94a3b8]">{act === 'hiit' ? 'High Intensity' : 'Cardio & Stamina'}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleLogWorkout}
                  className="w-full py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Log 30 min session (+{streakDays} day streak)</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* Project 3: Smile Steps */}
          {/* ========================================================================= */}
          {project.id === 'proj-3' && (
            <div className="space-y-6">
              {/* Header Overview */}
              <div className="bg-[#1a1b22] border border-[#818cf8]/20 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Smile Steps Oral Health Hub</h3>
                  <p className="text-xs text-[#94a3b8]">Interactive 2-minute brushing timer & daily pediatric habit tracker.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-[#94a3b8] block font-code">SMILE STREAK</span>
                    <span className="text-sm font-bold text-amber-400 font-code">{smileStreak} DAYS 🔥</span>
                  </div>
                  <div className="h-6 w-px bg-white/10"></div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#94a3b8] block font-code">STARS EARNED</span>
                    <span className="text-sm font-bold text-cyan-400 font-code">{starsCollected} ⭐</span>
                  </div>
                </div>
              </div>

              {/* 2-Minute Brushing Coach */}
              <div className="bg-[#1a1b22]/90 p-6 rounded-xl border border-[#818cf8]/30 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#818cf8]" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-code">
                      2-Minute Smart Brushing Coach
                    </h4>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-code">
                    {brushingQuadrant}
                  </span>
                </div>

                <div className="text-center py-4 bg-[#12131a] rounded-xl border border-[#818cf8]/20">
                  <div className="text-4xl sm:text-5xl font-black font-code text-white tracking-widest">
                    {Math.floor(brushingTimeLeft / 60)}:{(brushingTimeLeft % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-2 font-code">
                    {isBrushingActive ? 'Keep brushing smoothly in circular motions!' : 'Ready to start your 2-minute clean?'}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-3/4 mx-auto bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-[#818cf8] h-full transition-all duration-300"
                      style={{ width: `${((120 - brushingTimeLeft) / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setIsBrushingActive(!isBrushingActive)}
                    className="px-6 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isBrushingActive ? 'Pause Coach' : 'Start 2-Min Routine'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsBrushingActive(false);
                      setBrushingTimeLeft(120);
                      setBrushingQuadrant('Top Left & Right Outer');
                    }}
                    className="px-4 py-2.5 rounded-full bg-[#1e1b4b] border border-[#818cf8]/40 text-[#c6c5d5] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Habit Checklist & Live Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 space-y-3">
                  <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">
                    Today's Smile Checklist
                  </h4>
                  <div className="space-y-2 text-xs font-code">
                    {[
                      { key: 'morningBrush', label: 'Morning Brushing (2 Mins)' },
                      { key: 'floss', label: 'Dental Flossing' },
                      { key: 'hydrate', label: 'Drink 8 Glasses of Water' },
                      { key: 'nightBrush', label: 'Night Brushing Before Bed' },
                      { key: 'mouthwash', label: 'Gentle Oral Rinse' }
                    ].map((item) => (
                      <label
                        key={item.key}
                        onClick={() => toggleSmileItem(item.key as any)}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-[#12131a] hover:bg-[#1e1b4b] transition-all cursor-pointer text-[#c6c5d5]"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          smileChecklist[item.key as keyof typeof smileChecklist]
                            ? 'bg-emerald-500 border-emerald-400 text-black'
                            : 'border-white/20 bg-transparent'
                        }`}>
                          {smileChecklist[item.key as keyof typeof smileChecklist] && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1a1b22]/80 p-5 rounded-xl border border-[#818cf8]/20 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">
                      Official GitHub & Live Demo
                    </h4>
                    <p className="text-xs text-[#c6c5d5] leading-relaxed">
                      Check out the full repository and live deployment for Smile Steps on GitHub.
                    </p>
                  </div>

                  <a
                    href="https://github.com/dhars-hub/smileSteps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 px-5 py-3 rounded-full bg-[#1e1b4b] hover:bg-[#2a266b] border border-[#818cf8]/60 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <Github className="w-4 h-4 text-[#818cf8]" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#818cf8]" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* Project 4: Movie App (UI/UX Design - Figma) */}
          {/* ========================================================================= */}
          {project.id === 'proj-4' && (
            <div className="space-y-6">
              {/* Header Overview */}
              <div className="bg-[#1a1b22] border border-[#818cf8]/20 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Movie App Prototype & Seat Booking</h3>
                  <p className="text-xs text-[#94a3b8]">Interactive Figma UI simulation with real-time cinema seat picker & ticket calculations.</p>
                </div>
                
                <a
                  href="https://www.figma.com/design/12KdwQKedzgIrpYkSK4cMb/Untitled?node-id=11-41&t=2Uf6TAwsGQ3thrHi-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#1e1b4b] hover:bg-[#2c287a] border border-[#818cf8]/60 text-[#e0e0ff] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow"
                >
                  <Figma className="w-3.5 h-3.5 text-[#818cf8]" />
                  <span>Open Figma Design</span>
                  <ExternalLink className="w-3 h-3 text-[#818cf8]/70" />
                </a>
              </div>

              {/* Movie Selector Card */}
              <div className="bg-[#1a1b22]/90 p-5 rounded-xl border border-[#818cf8]/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">
                    1. Select Movie Experience
                  </h4>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {currentMovie.rating} / 10
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {MOVIES_LIST.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMovieIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedMovieIndex === idx
                          ? 'bg-[#1e1b4b] border-[#818cf8] text-white shadow-md'
                          : 'bg-[#12131a] border-[#818cf8]/20 text-[#94a3b8] hover:border-[#818cf8]/40'
                      }`}
                    >
                      <span className="text-xs font-bold block text-white truncate">{m.title}</span>
                      <span className="text-[10px] text-[#818cf8] block">{m.genre}</span>
                      <span className="text-[10px] text-[#94a3b8] block mt-1">${m.price.toFixed(2)} / seat</span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#c6c5d5] leading-relaxed bg-[#12131a] p-3 rounded-lg border border-white/5">
                  {currentMovie.synopsis}
                </p>
              </div>

              {/* Cinema Seat Selector */}
              <div className="bg-[#1a1b22]/90 p-5 rounded-xl border border-[#818cf8]/20 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[#818cf8] uppercase tracking-wider font-code">
                    2. Interactive Cinema Hall Seats (Click to Pick)
                  </h4>
                  <div className="flex items-center gap-2">
                    {['04:00 PM', '07:30 PM', '10:15 PM'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedShowtime(time)}
                        className={`px-2.5 py-1 rounded text-[10px] font-code transition-all cursor-pointer ${
                          selectedShowtime === time
                            ? 'bg-[#818cf8] text-[#101b8a] font-bold'
                            : 'bg-[#12131a] text-[#94a3b8] border border-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cinema Screen Curve */}
                <div className="py-2 text-center">
                  <div className="w-2/3 mx-auto h-2 bg-gradient-to-r from-transparent via-[#818cf8] to-transparent rounded-full shadow-[0_0_12px_rgba(129,140,248,0.8)]"></div>
                  <span className="text-[10px] text-[#94a3b8] font-code block mt-1">CINEMA SCREEN</span>
                </div>

                {/* Seat Matrix */}
                <div className="space-y-2 py-2">
                  {seatLayout.map((row, rIdx) => (
                    <div key={rIdx} className="flex justify-center gap-2 sm:gap-3">
                      {row.map((seatId) => {
                        const isSelected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-bold font-code transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#818cf8] text-[#101b8a] shadow-[0_0_10px_rgba(129,140,248,0.8)] scale-105'
                                : 'bg-[#12131a] border border-[#818cf8]/30 text-[#94a3b8] hover:border-[#818cf8] hover:text-white'
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Booking Summary & Trigger */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#94a3b8] font-code block">
                      SEATS: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}
                    </span>
                    <span className="text-sm font-bold text-white font-code">
                      TOTAL: ${(selectedSeats.length * currentMovie.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={handleBookTickets}
                    disabled={selectedSeats.length === 0}
                    className="px-6 py-2.5 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] flex items-center gap-2 cursor-pointer disabled:opacity-40"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{ticketBooked ? 'Seats Reserved!' : 'Simulate Reservation'}</span>
                  </button>
                </div>

                {ticketBooked && (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 font-code text-center animate-fadeIn">
                    ✓ Reservation confirmed for {selectedSeats.length} seats at {selectedShowtime}!
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#818cf8]/20 bg-[#1a1b22] flex flex-wrap justify-between items-center gap-2 text-xs font-code text-[#94a3b8]">
          <span>
            {project.id === 'proj-4'
              ? 'Design Tools: Figma, UI/UX Wireframing & Prototyping'
              : project.id === 'proj-3'
              ? 'Tech Stack: React, JavaScript, HealthTech UI'
              : 'Architecture: Web Technologies & Systems Design'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-[#818cf8] text-[#101b8a] text-xs font-bold hover:bg-[#939cf8] transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
