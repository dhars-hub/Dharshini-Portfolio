import React, { useState } from 'react';
import { X, Play, RefreshCw, CheckCircle2, Car, Activity, Zap, FileText, Download, ShieldCheck, Flame, HeartPulse, Trophy } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDemoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Toll System Interactive State
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

  // Google Form Survey Simulation State
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
  const [durationMins, setDurationMins] = useState(30);
  const [streakDays, setStreakDays] = useState(12);
  const [totalCalories, setTotalCalories] = useState(480);
  const [bpm, setBpm] = useState(138);
  const [loggedActivity, setLoggedActivity] = useState<string | null>(null);

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
              <Zap className="w-5 h-5 text-[#818cf8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#818cf8] text-[#101b8a] px-2 py-0.5 rounded font-code uppercase">
                  {project.badge}
                </span>
                <span className="text-xs text-[#818cf8] font-code">Live Interactive Demo</span>
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
          
          {/* If Toll Crossing System */}
          {project.id === 'proj-1' ? (
            <div className="space-y-6">
              
              {/* Simulator Banner / Overview */}
              <div className="bg-[#1a1b22] border border-[#818cf8]/20 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Toll Plaza Command Center</h3>
                  <p className="text-xs text-[#94a3b8]">Simulate vehicle RFID queue processing with automated receipt generation.</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-code">
                  <div className="bg-[#1e1b4b] px-3 py-1.5 rounded-lg border border-[#818cf8]/30">
                    <span className="text-[#94a3b8] block text-[10px]">VEHICLES</span>
                    <span className="text-white font-bold">{vehiclesProcessed}</span>
                  </div>
                  <div className="bg-[#1e1b4b] px-3 py-1.5 rounded-lg border border-[#818cf8]/30">
                    <span className="text-[#94a3b8] block text-[10px]">TOTAL TOLL</span>
                    <span className="text-[#bdc2ff] font-bold">${totalTollRevenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Queue Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Lane Inputs */}
                <div className="space-y-4 bg-[#1a1b22]/70 p-5 rounded-xl border border-[#818cf8]/15">
                  <h4 className="text-xs font-bold uppercase text-[#818cf8] font-code">1. Lane Queue Setup</h4>

                  <div className="space-y-2">
                    <label className="text-xs text-[#c6c5d5] font-code">Select Vehicle Class:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['sedan', 'suv', 'truck', 'bus'] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setVehicleType(t)}
                          className={`p-2.5 rounded-lg text-xs font-semibold uppercase font-code border transition-all cursor-pointer flex items-center justify-between ${
                            vehicleType === t
                              ? 'bg-[#818cf8] text-[#101b8a] border-[#818cf8] shadow-md'
                              : 'bg-[#12131a] text-[#c6c5d5] border-[#818cf8]/20 hover:border-[#818cf8]'
                          }`}
                        >
                          <span>{t}</span>
                          <span className="font-bold">${getVehicleFare(t).toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-[#c6c5d5] font-code">Vehicle License Plate:</label>
                      <button
                        onClick={handleRandomizePlate}
                        className="text-[11px] text-[#818cf8] hover:underline font-code flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Randomize Tag
                      </button>
                    </div>
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-[#12131a] border border-[#818cf8]/30 font-code text-white text-sm font-bold focus:outline-none focus:border-[#818cf8]"
                    />
                  </div>

                  <button
                    onClick={handleProcessToll}
                    disabled={processingToll}
                    className="w-full py-3 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-sm transition-all shadow-[0_0_15px_rgba(129,140,248,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {processingToll ? (
                      <span>Scanning RFID Tag...</span>
                    ) : (
                      <>
                        <Car className="w-4 h-4" />
                        <span>Process Toll (${getVehicleFare(vehicleType).toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Barrier Gate & Live Receipt Status */}
                <div className="space-y-4 bg-[#1a1b22]/70 p-5 rounded-xl border border-[#818cf8]/15 flex flex-col justify-between">
                  <h4 className="text-xs font-bold uppercase text-[#818cf8] font-code">2. Lane Barrier Status</h4>

                  {/* Barrier Indicator */}
                  <div className={`p-4 rounded-xl border text-center transition-all ${
                    barrierOpen
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                  }`}>
                    <div className="flex items-center justify-center gap-2 text-sm font-bold font-code">
                      <span className={`w-3 h-3 rounded-full ${barrierOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`}></span>
                      <span>LANE BARRIER: {barrierOpen ? 'GATE OPEN (PASS CLEAR)' : 'LANE CLOSED (WAITING)'}</span>
                    </div>
                  </div>

                  {/* Digital Receipt Output */}
                  {tollReceipt ? (
                    <div className="bg-[#12131a] p-4 rounded-xl border border-[#818cf8]/30 space-y-2 text-xs font-code">
                      <div className="flex justify-between items-center text-[#818cf8] font-bold border-b border-[#818cf8]/20 pb-2">
                        <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> TOLL RECEIPT</span>
                        <span>{tollReceipt.txnId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">Time:</span>
                        <span className="text-white">{tollReceipt.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">License Plate:</span>
                        <span className="text-white font-bold">{tollReceipt.plate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#94a3b8]">Vehicle Class:</span>
                        <span className="text-[#bdc2ff]">{tollReceipt.type}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#818cf8]/20 text-sm font-bold">
                        <span className="text-white">Amount Paid:</span>
                        <span className="text-emerald-400">${tollReceipt.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 text-xs text-[#94a3b8] font-code border border-dashed border-[#818cf8]/20 rounded-xl">
                      Click "Process Toll" to generate digital toll receipt.
                    </div>
                  )}

                </div>

              </div>

            </div>
          ) : (
            /* If Fitness Activities Project */
            <div className="space-y-6">
              
              {/* Live Metrics Header */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1a1b22] p-4 rounded-xl border border-[#818cf8]/20 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94a3b8] font-code block">HEART RATE</span>
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

              {/* Notification Banner */}
              {loggedActivity && (
                <div className="bg-emerald-950/50 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 font-code text-center animate-fadeIn">
                  {loggedActivity}
                </div>
              )}

              {/* Workout Logging Form */}
              <div className="bg-[#1a1b22]/80 p-6 rounded-xl border border-[#818cf8]/20 space-y-4">
                <h3 className="text-sm font-bold text-white font-display">Log Workout Activity & Boost Goals</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-[#c6c5d5] font-code">Activity Type:</label>
                    <div className="flex gap-2">
                      {(['running', 'cycling', 'hiit'] as const).map((act) => (
                        <button
                          key={act}
                          onClick={() => setActivityType(act)}
                          className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase font-code border transition-all cursor-pointer ${
                            activityType === act
                              ? 'bg-[#818cf8] text-[#101b8a] border-[#818cf8]'
                              : 'bg-[#12131a] text-[#c6c5d5] border-[#818cf8]/20'
                          }`}
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#c6c5d5] font-code">
                      <span>Duration (mins):</span>
                      <span className="text-[#818cf8] font-bold">{durationMins} mins</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={durationMins}
                      onChange={(e) => setDurationMins(Number(e.target.value))}
                      className="w-full accent-[#818cf8] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  onClick={handleLogWorkout}
                  className="w-full py-3 rounded-full bg-[#818cf8] hover:bg-[#939cf8] text-[#101b8a] font-bold text-sm transition-all shadow-[0_0_20px_rgba(129,140,248,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Log Activity & Update Progress</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#818cf8]/20 bg-[#1a1b22] flex justify-between items-center text-xs font-code text-[#94a3b8]">
          <span>Project Architecture: PHP, MySQL, Web UI</span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-[#818cf8] text-[#101b8a] text-xs font-bold hover:bg-[#939cf8] transition-all cursor-pointer"
          >
            Close Demo
          </button>
        </div>

      </div>
    </div>
  );
};
